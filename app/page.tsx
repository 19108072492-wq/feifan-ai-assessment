import type { Metadata } from "next";
import { AssessmentApp } from "./AssessmentApp";

export const metadata: Metadata = {
  title: "AI能力与风格测评｜看见你的 AI 工作方式",
  description: "通过22道岗位情境题和1道真实提示词任务，生成六维能力、成长等级与AI使用风格画像。",
};

export default function Home() {
  return <AssessmentApp />;
}
