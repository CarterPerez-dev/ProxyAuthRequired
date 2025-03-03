import React from "react";
import { useParams } from "react-router-dom";
import CySAPlusTestList from "./CySAPlusTestList";
import GlobalTestPage from "../../GlobalTestPage";
import "../../test.css";

const CySAPlusTestPage = () => {
  const { testId } = useParams();

  if (!testId) {
    return <CySAPlusTestList />;
  }

  return (
    <GlobalTestPage
      testId={testId}
      category="cysa"
      backToListPath="/practice-tests/cysa-plus"
    />
  );
};

export default CySAPlusTestPage;

