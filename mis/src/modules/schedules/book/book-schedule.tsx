import React, {useEffect} from 'react';
import LoadingIndicator from 'shared/loading-indicator/loading-indicator';
import {fetchInterviewersThunk} from 'state/actions/interviewers';
import {useAppDispatch, useAppSelector} from 'state/hooks';
import {RootState} from 'state/store';
import InterviewerList from './interviewer-list';

export default function BookSchedule(): JSX.Element {
  const interviewers = useAppSelector((state: RootState) => state.interviewers);
  const hasInterviewers = interviewers.length > 0;
  const dispatch = useAppDispatch();

  console.log(typeof interviewers);

  console.log('hasinterviewers', hasInterviewers, interviewers.length);

  useEffect(() => {
    !hasInterviewers && dispatch(fetchInterviewersThunk(!hasInterviewers));
  }, []);

  return (
    <>
      {hasInterviewers ? (
        <InterviewerList interviewers={interviewers} />
      ) : (
        <LoadingIndicator />
      )}
    </>
  );
}