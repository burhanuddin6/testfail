from django.test import TestCase
from django.contrib.auth import get_user_model
from ..models import TestPlan, TestSuite, Section, TestRun, TestPlanTestRun, Milestone, Project

class TestPlanSaveMethodTestCase(TestCase):

    def setUp(self):
        self.user = get_user_model().objects.create_user(email='testuser@example.com', password='testpassword')
        self.project = Project.objects.create(name='Test Project', created_by=self.user)
        self.milestone = Milestone.objects.create(name='Milestone 1', created_by=self.user, project_id=self.project)
        self.test_suite = TestSuite.objects.create(name='Test Suite 1', created_by=self.user, project_id=self.project)
        self.section = Section.objects.create(name='Section 1', test_suite_id=self.test_suite, created_by=self.user)

    def test_create_test_run_and_association_all_selection(self):
        test_plan = TestPlan.objects.create(
            name='Test Plan 1',
            milestone_id=self.milestone,
            project_id=self.project,
            created_by=self.user,
            selection=[
                {
                    "test_suite_id": self.test_suite.pk,
                    "test_suite_name": self.test_suite.name,
                    "selection_type": "ALL",
                    "selection": []
                }
            ]
        )

        test_runs = TestRun.objects.filter(test_suite_id=self.test_suite)
        self.assertEqual(test_runs.count(), 1)

        test_plan_test_runs = TestPlanTestRun.objects.filter(test_plan_id=test_plan)
        self.assertEqual(test_plan_test_runs.count(), 1)

        test_run = test_runs.first()
        self.assertEqual(test_run.test_suite_id, self.test_suite)
        self.assertEqual(test_run.test_case_filter, 'ALL')
        self.assertEqual(test_run.test_case_filter_value, '')

    def test_create_test_run_and_association_selected_selection(self):
        test_plan = TestPlan.objects.create(
            name='Test Plan 2',
            milestone_id=self.milestone,
            project_id=self.project,
            created_by=self.user,
            selection=[
                {
                    "test_suite_id": self.test_suite.pk,
                    "test_suite_name": self.test_suite.name,
                    "selection_type": "SELECTED",
                    "selection": [
                        {
                            "section_id": self.section.pk,
                            "section_name": self.section.name,
                            "test_cases": [
                                {"test_case_id": 1, "test_case_name": "Test Case 1"},
                                {"test_case_id": 2, "test_case_name": "Test Case 2"}
                            ]
                        }
                    ]
                }
            ]
        )

        test_runs = TestRun.objects.filter(test_suite_id=self.test_suite)
        self.assertEqual(test_runs.count(), 1)

        test_plan_test_runs = TestPlanTestRun.objects.filter(test_plan_id=test_plan)
        self.assertEqual(test_plan_test_runs.count(), 1)

        test_run = test_runs.first()
        self.assertEqual(test_run.test_suite_id, self.test_suite)
        self.assertEqual(test_run.test_case_filter, 'SELECTED')
        self.assertEqual(test_run.test_case_filter_value, '1, 2')

    def test_create_test_run_and_association_regex_selection(self):
        test_plan = TestPlan.objects.create(
            name='Test Plan 3',
            milestone_id=self.milestone,
            project_id=self.project,
            created_by=self.user,
            selection=[
                {
                    "test_suite_id": self.test_suite.pk,
                    "test_suite_name": self.test_suite.name,
                    "selection_type": "REGEX_ON_NAME",
                    "selection": "Test Case.*"
                }
            ]
        )

        test_runs = TestRun.objects.filter(test_suite_id=self.test_suite)
        self.assertEqual(test_runs.count(), 1)

        test_plan_test_runs = TestPlanTestRun.objects.filter(test_plan_id=test_plan)
        self.assertEqual(test_plan_test_runs.count(), 1)

        test_run = test_runs.first()
        self.assertEqual(test_run.test_suite_id, self.test_suite)
        self.assertEqual(test_run.test_case_filter, 'REGEX_ON_NAME')
        self.assertEqual(test_run.test_case_filter_value, 'Test Case.*')

    def test_update_test_plan(self):
        test_plan = TestPlan.objects.create(
            name='Test Plan 4',
            milestone_id=self.milestone,
            project_id=self.project,
            created_by=self.user,
            selection=[
                {
                    "test_suite_id": self.test_suite.pk,
                    "test_suite_name": self.test_suite.name,
                    "selection_type": "ALL",
                    "selection": []
                }
            ]
        )

        original_updated_on = test_plan.updated_on

        test_plan.name = 'Updated Test Plan 4'
        test_plan.save()

        self.assertNotEqual(test_plan.updated_on, original_updated_on)

    def test_delete_test_plan(self):
        test_plan = TestPlan.objects.create(
            name='Test Plan 5',
            milestone_id=self.milestone,
            project_id=self.project,
            created_by=self.user,
            selection=[
                {
                    "test_suite_id": self.test_suite.pk,
                    "test_suite_name": self.test_suite.name,
                    "selection_type": "ALL",
                    "selection": []
                }
            ]
        )

        self.assertEqual(TestRun.objects.filter(test_plan_test_runs__test_plan_id=test_plan.pk).count(), 1)
        self.assertEqual(TestPlanTestRun.objects.filter(test_plan_id=test_plan.pk).count(), 1)

        test_plan.delete()

        self.assertEqual(TestRun.objects.filter(test_plan_test_runs__test_plan_id=test_plan.pk).count(), 0)
        self.assertEqual(TestPlanTestRun.objects.filter(test_plan_id=test_plan.pk).count(), 0)

    def test_create_two_test_plans(self):
        test_plan1 = TestPlan.objects.create(
            name='Test Plan 6',
            milestone_id=self.milestone,
            project_id=self.project,
            created_by=self.user,
            selection=[
                {
                    "test_suite_id": self.test_suite.pk,
                    "test_suite_name": self.test_suite.name,
                    "selection_type": "ALL",
                    "selection": []
                }
            ]
        )

        test_plan2 = TestPlan.objects.create(
            name='Test Plan 7',
            milestone_id=self.milestone,
            project_id=self.project,
            created_by=self.user,
            selection=[
                {
                    "test_suite_id": self.test_suite.pk,
                    "test_suite_name": self.test_suite.name,
                    "selection_type": "ALL",
                    "selection": []
                }
            ]
        )

        self.assertEqual(TestPlan.objects.count(), 2)
        self.assertEqual(TestRun.objects.filter(test_suite_id=self.test_suite).count(), 2)
        self.assertEqual(TestPlanTestRun.objects.filter(test_plan_id=test_plan1).count(), 1)
        self.assertEqual(TestPlanTestRun.objects.filter(test_plan_id=test_plan2).count(), 1)

    def test_create_test_plan_after_deleting_another(self):
        test_plan1 = TestPlan.objects.create(
            name='Test Plan 8',
            milestone_id=self.milestone,
            project_id=self.project,
            created_by=self.user,
            selection=[
                {
                    "test_suite_id": self.test_suite.pk,
                    "test_suite_name": self.test_suite.name,
                    "selection_type": "ALL",
                    "selection": []
                }
            ]
        )

        self.assertEqual(TestRun.objects.filter(test_plan_test_runs__test_plan_id=test_plan1.pk).count(), 1)
        self.assertEqual(TestPlanTestRun.objects.filter(test_plan_id=test_plan1.pk).count(), 1)

        test_plan1.delete()

        self.assertEqual(TestRun.objects.filter(test_plan_test_runs__test_plan_id=test_plan1.pk).count(), 0)
        self.assertEqual(TestPlanTestRun.objects.filter(test_plan_id=test_plan1.pk).count(), 0)

        test_plan2 = TestPlan.objects.create(
            name='Test Plan 9',
            milestone_id=self.milestone,
            project_id=self.project,
            created_by=self.user,
            selection=[
                {
                    "test_suite_id": self.test_suite.pk,
                    "test_suite_name": self.test_suite.name,
                    "selection_type": "ALL",
                    "selection": []
                }
            ]
        )

        self.assertEqual(TestPlan.objects.count(), 1)
        self.assertEqual(TestRun.objects.filter(test_suite_id=self.test_suite).count(), 1)
        self.assertEqual(TestPlanTestRun.objects.filter(test_plan_id=test_plan2).count(), 1)
