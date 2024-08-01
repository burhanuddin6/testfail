from django.db.models.signals import post_save, post_delete
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from django.contrib.auth import get_user_model
from ..models import (
    Milestone, TestCase, TestCaseResult, TestSuite, Section, TestRun, TestPlan, Project
)
from django.db.models.signals import pre_save

class SignalHandlerTestCase(APITestCase):

    def setUp(self):
        self.user = get_user_model().objects.create_user(email='testuser@example.com', password='testpassword')
        self.project = Project.objects.create(name='Test Project', created_by=self.user)
        self.milestone = Milestone.objects.create(name='Milestone', project_id=self.project, created_by=self.user)
        self.test_suite = TestSuite.objects.create(name='Test Suite', created_by=self.user, project_id=self.project, milestone_id=self.milestone)
        self.section = Section.objects.create(name='Section', test_suite_id=self.test_suite, created_by=self.user)
        self.test_case = TestCase.objects.create(name='Test Case', section_id=self.section, created_by=self.user)
        self.test_run = TestRun.objects.create(name='Test Run', test_plan_id=self.test_plan, created_by=self.user)
        self.test_plan = TestPlan.objects.create(name='Test Plan', project_id=self.project, created_by=self.user, test_suite_id=self.test_suite)

    def test_update_testsuite_stats_on_test_case_result(self):
        # Create a TestCaseResult and ensure stats update correctly
        test_case_result = TestCaseResult.objects.create(test_case_id=self.test_case, status='PASS', created_by=self.user)
        self.test_suite.refresh_from_db()
        self.assertEqual(self.test_suite.number_of_passed_test_cases, 1)
        
        # Update the TestCaseResult and ensure stats update correctly
        test_case_result.status = 'FAIL'
        test_case_result.save()
        self.test_suite.refresh_from_db()
        self.assertEqual(self.test_suite.number_of_passed_test_cases, 0)
        self.assertEqual(self.test_suite.number_of_failed_test_cases, 1)

        # Delete the TestCaseResult and ensure stats update correctly
        test_case_result.delete()
        self.test_suite.refresh_from_db()
        self.assertEqual(self.test_suite.number_of_failed_test_cases, 0)

    def test_update_testsuite_stats_on_test_case(self):
        # Add a new TestCase and ensure stats update correctly
        TestCase.objects.create(name='New Test Case', section_id=self.section, created_by=self.user)
        self.test_suite.refresh_from_db()
        self.assertEqual(self.test_suite.number_of_test_cases, 2)
        
        # Delete the TestCase and ensure stats update correctly
        self.test_case.delete()
        self.test_suite.refresh_from_db()
        self.assertEqual(self.test_suite.number_of_test_cases, 1)

    def test_update_test_suite_stats_on_section(self):
        # Add a new Section and ensure stats update correctly
        Section.objects.create(name='New Section', test_suite_id=self.test_suite, created_by=self.user)
        self.test_suite.refresh_from_db()
        self.assertEqual(self.test_suite.number_of_sections, 2)
        
        # Delete the Section and ensure stats update correctly
        self.section.delete()
        self.test_suite.refresh_from_db()
        self.assertEqual(self.test_suite.number_of_sections, 1)

    def test_update_test_run_stats_on_test_case_result(self):
        # Add a TestCaseResult to a TestRun and ensure stats update correctly
        test_case_result = TestCaseResult.objects.create(test_case_id=self.test_case, status='PASS', created_by=self.user)
        self.test_run.test_case_results.add(test_case_result)
        self.test_run.refresh_from_db()
        self.assertEqual(self.test_run.number_of_passed_test_cases, 1)
        
        # Update the TestCaseResult and ensure stats update correctly
        test_case_result.status = 'FAIL'
        test_case_result.save()
        self.test_run.refresh_from_db()
        self.assertEqual(self.test_run.number_of_passed_test_cases, 0)
        self.assertEqual(self.test_run.number_of_failed_test_cases, 1)

        # Delete the TestCaseResult and ensure stats update correctly
        test_case_result.delete()
        self.test_run.refresh_from_db()
        self.assertEqual(self.test_run.number_of_failed_test_cases, 0)

    def test_update_test_plan_stats_on_test_run(self):
        # Add a TestRun and ensure stats update correctly
        test_case_result = TestCaseResult.objects.create(test_case_id=self.test_case, status='PASS', created_by=self.user)
        self.test_run.test_case_results.add(test_case_result)
        self.test_run.save()
        self.test_plan.refresh_from_db()
        self.assertEqual(self.test_plan.number_of_passed_test_cases, 1)

        # Update the TestRun stats and ensure stats update correctly
        test_case_result.status = 'FAIL'
        test_case_result.save()
        self.test_plan.refresh_from_db()
        self.assertEqual(self.test_plan.number_of_passed_test_cases, 0)
        self.assertEqual(self.test_plan.number_of_failed_test_cases, 1)

        # Delete the TestRun and ensure stats update correctly
        self.test_run.delete()
        self.test_plan.refresh_from_db()
        self.assertEqual(self.test_plan.number_of_failed_test_cases, 0)

    def test_update_milestone_stats_on_test_run(self):
        # Add a TestRun to a Milestone and ensure stats update correctly
        self.milestone.testruns.add(self.test_run)
        test_case_result = TestCaseResult.objects.create(test_case_id=self.test_case, status='PASS', created_by=self.user)
        self.test_run.test_case_results.add(test_case_result)
        self.test_run.save()
        self.milestone.refresh_from_db()
        self.assertEqual(self.milestone.number_of_passed_test_cases, 1)

        # Update the TestRun stats and ensure stats update correctly
        test_case_result.status = 'FAIL'
        test_case_result.save()
        self.milestone.refresh_from_db()
        self.assertEqual(self.milestone.number_of_passed_test_cases, 0)
        self.assertEqual(self.milestone.number_of_failed_test_cases, 1)

        # Delete the TestRun and ensure stats update correctly
        self.test_run.delete()
        self.milestone.refresh_from_db()
        self.assertEqual(self.milestone.number_of_failed_test_cases, 0)

    def test_delete_results_on_test_run_test_case_result(self):
        # Add a TestCaseResult and associate it with a TestRun
        test_case_result = TestCaseResult.objects.create(test_case_id=self.test_case, status='PASS', created_by=self.user)
        self.test_run.test_case_results.add(test_case_result)
        self.assertEqual(TestCaseResult.objects.count(), 1)

        # Delete the TestRunTestCaseResult and ensure TestCaseResult is deleted
        self.test_run.test_case_results.remove(test_case_result)
        self.assertEqual(TestCaseResult.objects.count(), 0)
