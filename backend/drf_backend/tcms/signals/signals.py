# from django.db.models.signals import post_save, post_delete
# from django.dispatch import receiver
# from ..models import *

# @receiver(post_save, sender=TestCaseResult)
# @receiver(post_delete, sender=TestCaseResult)
# def update_testsuite_stats(sender, instance, **kwargs):
#     test_suite = TestSuite.objects.get(test_suite_id=instance.test_case_id.section_id.test_suite_id.pk)
#     test_suite.number_of_passed_test_cases = TestCase.objects.filter(section_id__test_suite_id=test_suite, latest_result_id__status='PASS').count()
#     test_suite.number_of_failed_test_cases = TestCase.objects.filter(section_id__test_suite_id=test_suite, latest_result_id__status='FAIL').count()
#     test_suite.number_of_blocked_test_cases = TestCase.objects.filter(section_id__test_suite_id=test_suite, latest_result_id__status='BLOCKED').count()
#     test_suite.number_of_untested_test_cases = TestCase.objects.filter(section_id__test_suite_id=test_suite, latest_result_id__status='UNTESTED').count()
#     test_suite.number_of_partial_test_cases = TestCase.objects.filter(section_id__test_suite_id=test_suite, latest_result_id__status='PARTIAL').count()
#     test_suite.testcase_latest_result_comments_count = TestCase.objects.filter(section_id__test_suite_id=test_suite, latest_result_id__comment__isnull=False).count()
#     test_suite.save()

# @receiver(post_save, sender=TestCase)
# @receiver(post_delete, sender=TestCase)
# def update_testsuite_stats_on_test_case(sender, instance, **kwargs):
#     test_suite = TestSuite.objects.get(test_suite_id=instance.section_id.test_suite_id.pk)
#     test_suite.number_of_test_cases = TestCase.objects.filter(section_id__test_suite_id=test_suite).count()
#     test_suite.save()

# @receiver(post_save, sender=Section)
# @receiver(post_delete, sender=Section)
# def update_test_suite_stats_on_section(sender, instance, **kwargs):
#     test_suite = TestSuite.objects.get(test_suite_id=instance.test_suite_id.pk)
#     test_suite.number_of_sections = Section.objects.filter(test_suite_id=test_suite).count()
#     test_suite.save()

# @receiver(post_save, sender=TestCaseResult)
# @receiver(post_delete, sender=TestCaseResult)
# def update_test_run_stats_on_test_case_result(sender, instance, **kwargs):
#     try:
#         test_run = TestRun.objects.get(test_case_results__test_case_result_id=instance.pk)
#         test_run.number_of_passed_test_cases = TestRunTestCaseResult.objects.filter(test_run_id=test_run, test_case_result_id__status='PASS').count()
#         test_run.number_of_failed_test_cases = TestRunTestCaseResult.objects.filter(test_run_id=test_run, test_case_result_id__status='FAIL').count()
#         test_run.number_of_blocked_test_cases = TestRunTestCaseResult.objects.filter(test_run_id=test_run, test_case_result_id__status='BLOCKED').count()
#         test_run.number_of_untested_test_cases = TestRunTestCaseResult.objects.filter(test_run_id=test_run, test_case_result_id__status='UNTESTED').count()
#         test_run.number_of_partial_test_cases = TestRunTestCaseResult.objects.filter(test_run_id=test_run, test_case_result_id__status='PARTIAL').count()
#         test_run.number_of_test_cases = TestCaseResult.objects.filter(test_run_test_case_results__test_run_id=test_run).count()
#         test_run.save()
#     except TestRun.DoesNotExist:
#         pass


# @receiver(post_save, sender=TestRun)
# @receiver(post_delete, sender=TestRun)
# def update_test_plan_stats_on_test_run(sender, instance, **kwargs):
#     try:
#         test_plan = TestPlan.objects.get(test_runs__test_run_id=instance.pk)
#         test_plan.number_of_passed_test_cases = TestRun.objects.filter(test_plan_id=test_plan).aggregate(models.Sum('number_of_passed_test_cases'))['number_of_passed_test_cases__sum']
#         test_plan.number_of_failed_test_cases = TestRun.objects.filter(test_plan_id=test_plan).aggregate(models.Sum('number_of_failed_test_cases'))['number_of_failed_test_cases__sum']
#         test_plan.number_of_blocked_test_cases = TestRun.objects.filter(test_plan_id=test_plan).aggregate(models.Sum('number_of_blocked_test_cases'))['number_of_blocked_test_cases__sum']
#         test_plan.number_of_untested_test_cases = TestRun.objects.filter(test_plan_id=test_plan).aggregate(models.Sum('number_of_untested_test_cases'))['number_of_untested_test_cases__sum']
#         test_plan.number_of_partial_test_cases = TestRun.objects.filter(test_plan_id=test_plan).aggregate(models.Sum('number_of_partial_test_cases'))['number_of_partial_test_cases__sum']
#         test_plan.number_of_test_cases = TestRun.objects.filter(test_plan_id=test_plan).aggregate(models.Sum('number_of_test_cases'))['number_of_test_cases__sum']
#         test_plan.save()
#     except TestPlan.DoesNotExist:
#         pass

# @receiver(post_save, sender=TestRun)
# @receiver(post_delete, sender=TestRun)
# def update_milestone_stats_on_test_run(sender, instance, **kwargs):
#     try:
#         milestone = Milestone.objects.get(testruns__test_run_id=instance.pk)
#         milestone.number_of_passed_test_cases = TestRun.objects.filter(milestone_id=milestone).aggregate(models.Sum('number_of_passed_test_cases'))['number_of_passed_test_cases__sum']
#         milestone.number_of_failed_test_cases = TestRun.objects.filter(milestone_id=milestone).aggregate(models.Sum('number_of_failed_test_cases'))['number_of_failed_test_cases__sum']
#         milestone.number_of_blocked_test_cases = TestRun.objects.filter(milestone_id=milestone).aggregate(models.Sum('number_of_blocked_test_cases'))['number_of_blocked_test_cases__sum']
#         milestone.number_of_untested_test_cases = TestRun.objects.filter(milestone_id=milestone).aggregate(models.Sum('number_of_untested_test_cases'))['number_of_untested_test_cases__sum']
#         milestone.number_of_partial_test_cases = TestRun.objects.filter(milestone_id=milestone).aggregate(models.Sum('number_of_partial_test_cases'))['number_of_partial_test_cases__sum']
#         milestone.number_of_test_cases = TestRun.objects.filter(milestone_id=milestone).aggregate(models.Sum('number_of_test_cases'))['number_of_test_cases__sum']
#         milestone.save()
#     except Milestone.DoesNotExist:
#         pass
    
# @receiver(post_delete, sender=TestRunTestCaseResult)
# def delete_results_on_test_run_test_case_result(sender, instance, **kwargs):
#     instance.test_case_result_id.delete()


# from django.db.models.signals import post_save
# from django.dispatch import receiver
# from ..models import *
# from django.db import transaction

# @receiver(post_save, sender=TestCase)
# @receiver(post_save, sender=TestCaseResult)
# @receiver(post_save, sender=Section)
# @receiver(post_save, sender=TestSuite)
# @receiver(post_save, sender=TestPlan)
# @receiver(post_save, sender=TestRun)
# @receiver(post_save, sender=Milestone)
# @receiver(post_save, sender=Project)
# def update_user_actions(sender, instance, created, **kwargs):
#     if created:
#         action = UserAction.CREATED
#         if sender.__name__ == 'TestCaseResult':
#             try:
#                 test_run=TestRun.objects.get(test_case_results__test_case_result_id=instance.pk)
#                 if test_run.is_part_of_test_plan:
#                     test_plan=TestPlan.objects.get(test_runs__test_run_id=test_run)
#                     print("HELLO")
#                     action_message=f'created "{str(instance.test_case_id)}" for Test Plan: "{str(test_plan)}"'
#                 else:
#                     action_message=f'created "{str(instance.test_case_id)}" for Test Run: "{str(test_run)}"'
#             except TestRun.DoesNotExist:
#                 action_message=f'created "{str(instance)}"'
#         else:
#             action_message=f'created "{str(instance)}"'
#     else:
#         action = UserAction.UPDATED
#         if sender.__name__ == 'TestCaseResult':
#             try:
#                 test_run=TestRun.objects.get(test_case_results__test_case_result_id=instance.pk)
#                 if test_run.is_part_of_test_plan:
#                     test_plan=TestPlan.objects.get(test_runs__test_run_id=test_run)
#                     action_message=f'updated "{str(instance.test_case_id)}" for Test Plan: "{str(test_plan)}"'
#                 else:
#                     action_message=f'updated "{str(instance.test_case_id)}" for Test Run: "{str(test_run)}"'
#             except TestRun.DoesNotExist:
#                 action_message = f'updated "{str(instance)}"'
#         else:
#             action_message=f'updated "{str(instance)}"'
#     UserAction.objects.create(
#         user=instance.created_by,
#         action = action,
#         action_object = sender.__name__,
#         action_message=action_message,
#     )


# @receiver(post_delete, sender=TestCase)
# @receiver(post_delete, sender=TestCaseResult)
# @receiver(post_delete, sender=Section)
# @receiver(post_delete, sender=TestSuite)
# @receiver(post_delete, sender=TestPlan)
# @receiver(post_delete, sender=TestRun)
# @receiver(post_delete, sender=Milestone)
# @receiver(post_delete, sender=Project)
# def delete_user_actions(sender, instance, **kwargs):
#     UserAction.objects.create(
#         user=instance.created_by,
#         action = UserAction.DELETED,
#         action_object = sender.__name__,
#         action_message=f'deleted "{str(instance)}"',
#     )