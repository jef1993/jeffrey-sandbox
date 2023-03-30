import { SetStateAction, Suspense, useState } from "react";
import ErrorBoundary from "../../components/ErrorBoundary";
import axios, { AxiosResponse } from "axios";
import SimpleBar from "simplebar-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Overview from "./Overview";

const ReactQuery: React.FC = () => {
  return (
    <div className="react-query">
      <Overview />
    </div>
  );
};

export default ReactQuery;
