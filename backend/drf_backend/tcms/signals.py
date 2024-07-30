from django.db.models.signals import post_save, post_delete, pre_delete
from django.dispatch import receiver
from .models import *
from django.db import transaction

@receiver(post_save, sender=TestCaseResult)
@receiver(post_delete, sender=TestCaseResult)
def update_testsuite_stats(sender, instance, **kwargs):
    test_suite = TestSuite.objects.get(test_suite_id=instance.test_case_id.section_id.test_suite_id.pk)
    test_suite.number_of_passed_test_cases = TestCase.objects.filter(section_id__test_suite_id=test_suite, latest_result_id__status='PASS').count()
    test_suite.number_of_failed_test_cases = TestCase.objects.filter(section_id__test_suite_id=test_suite, latest_result_id__status='FAIL').count()
    test_suite.number_of_blocked_test_cases = TestCase.objects.filter(section_id__test_suite_id=test_suite, latest_result_id__status='BLOCKED').count()
    test_suite.number_of_untested_test_cases = TestCase.objects.filter(section_id__test_suite_id=test_suite, latest_result_id__status='UNTESTED').count()
    test_suite.number_of_partial_test_cases = TestCase.objects.filter(section_id__test_suite_id=test_suite, latest_result_id__status='PARTIAL').count()
    test_suite.testcase_latest_result_comments_count = TestCase.objects.filter(section_id__test_suite_id=test_suite, latest_result_id__comment__isnull=False).count()
    test_suite.save()

@receiver(post_save, sender=TestCase)
@receiver(post_delete, sender=TestCase)
def update_testsuite_stats_on_test_case(sender, instance, **kwargs):
    test_suite = TestSuite.objects.get(test_suite_id=instance.section_id.test_suite_id.pk)
    test_suite.number_of_test_cases = TestCase.objects.filter(section_id__test_suite_id=test_suite).count()
    test_suite.save()

@receiver(post_save, sender=Section)
@receiver(post_delete, sender=Section)
def update_test_suite_stats_on_section(sender, instance, **kwargs):
    test_suite = TestSuite.objects.get(test_suite_id=instance.test_suite_id.pk)
    test_suite.number_of_sections = Section.objects.filter(test_suite_id=test_suite).count()
    test_suite.save()

@receiver(post_save, sender=TestCaseResult)
@receiver(post_delete, sender=TestCaseResult)
def update_milestone_stats_on_test_case_result(sender, instance, **kwargs):
    try:
        milestone = Milestone.objects.get(testruns__test_case_results__test_case_result_id=instance.pk)
    except Milestone.DoesNotExist:
        milestone = None
    if milestone is not None:
        milestone.number_of_passed_test_cases = TestRunTestCaseResult.objects.filter(test_run_id__milestone_id=milestone, test_case_result_id__status='PASS').count()
        milestone.number_of_failed_test_cases = TestRunTestCaseResult.objects.filter(test_run_id__milestone_id=milestone, test_case_result_id__status='FAIL').count()
        milestone.number_of_test_cases = TestRunTestCaseResult.objects.filter(test_run_id__milestone_id=milestone).count()
        milestone.save()

@receiver(post_delete, sender=TestRunTestCaseResult)
def delete_results_on_test_run_test_case_result(sender, instance, **kwargs):
    instance.test_case_result_id.delete()