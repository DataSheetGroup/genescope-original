// Local-only API. The dataset and model run entirely in the browser
// from the bundled CSV — no Flask backend required.
import {
  buildEdaData,
  getFeatureImportanceLocal,
  getMetricsLocal,
  predictLocal,
} from "./local-data";
import type {
  EdaData,
  FeatureImportance,
  HealthResponse,
  MetricsResponse,
  ModelMetrics,
  PredictPayload,
  PredictResponse,
} from "./api-types";

export type {
  EdaData,
  FeatureImportance,
  HealthResponse,
  MetricsResponse,
  ModelMetrics,
  PredictPayload,
  PredictResponse,
};

const delay = <T,>(value: T, ms = 120) =>
  new Promise<T>((resolve) => setTimeout(() => resolve(value), ms));

export const getHealth = (): Promise<HealthResponse> =>
  delay({ status: "ok", model: "local-naive-bayes" });

export const getEdaData = (): Promise<EdaData> => delay(buildEdaData());

export const getMetrics = (): Promise<MetricsResponse> =>
  delay({ models: getMetricsLocal() });

export const getFeatureImportance = (): Promise<FeatureImportance> =>
  delay(getFeatureImportanceLocal());

import { getToken } from "./auth";

const API_URL =
  (import.meta.env.VITE_API_URL as string | undefined)?.replace(/\/$/, "") ??
  "http://localhost:5000";

export const postPredict = async (payload: PredictPayload): Promise<PredictResponse> => {
  try {
    const headers: Record<string, string> = { "Content-Type": "application/json" };
    const token = getToken();
    if (token) headers.Authorization = `Bearer ${token}`;
    const res = await fetch(`${API_URL}/predict`, {
      method: "POST",
      headers,
      body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error(`Predict failed (${res.status})`);
    const data = await res.json();
    if (data?.model && data.model !== "unavailable") {
      return {
        prediction: data.prediction,
        confidence: Number(data.confidence) || 0,
        probability_comprehensive: Number(data.probability_comprehensive) || 0,
        probability_targeted: Number(data.probability_targeted) || 0,
      } as PredictResponse;
    }
    // model unavailable on server → fall back
  } catch (e) {
    console.warn("[predict] backend unavailable, using local fallback", e);
  }
  return predictLocal(payload);
};
