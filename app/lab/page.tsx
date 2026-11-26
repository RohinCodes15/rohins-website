import type { Metadata } from "next";
import type { ReactNode } from "react";
import { SectionHeading } from "@/components/editorial/section-heading";
import { ClientOnly } from "@/components/lab/client-only";
import { MonteCarloDemo } from "@/components/lab/monte-carlo-demo";
import { PortfolioDemo } from "@/components/lab/portfolio-demo";
import { RegressionDemo } from "@/components/lab/regression-demo";
import { SectionNavigation } from "@/components/site/section-navigation";
import { Container } from "@/components/ui/container";
import { Link } from "@/components/ui/link";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: `Research lab · ${site.name}`,
  description: "Interactive educational demonstrations of Monte Carlo simulation, portfolio risk, and linear regression on synthetic data.",
};

const Explain = ({ children }: { children: ReactNode }) => <div className="grid-main max-w-prose space-y-3">{children}</div>;
const Formula = ({ children }: { children: ReactNode }) => (
  <p className="border-l-2 border-rule-strong py-1 ps-4 font-mono text-meta text-balance">{children}</p>
);

const sections: { id: string; label: string; content: ReactNode }[] = [
  { id: "monte-carlo", label: "Monte Carlo price paths", content: <>
    <Explain>
      <p>A Monte Carlo method estimates a quantity by simulating many random outcomes and averaging them. Here each path follows geometric Brownian motion, the textbook model behind Black–Scholes, stepped once per trading day:</p>
      <Formula>S(t+Δt) = S(t) · exp((μ − σ²/2)Δt + σ√Δt · Z),  Z ~ N(0, 1)</Formula>
      <p>The model has a closed-form mean, E[S<sub>T</sub>] = S<sub>0</sub>e<sup>μT</sup>, so the simulation can be checked. The estimate should land within about two standard errors of it, and the error shrinks with the square root of the number of paths.</p>
    </Explain>
    <div className="grid-figure mt-8"><ClientOnly minHeight="60rem"><MonteCarloDemo /></ClientOnly></div>
  </> },
  { id: "portfolio-risk", label: "Two-asset portfolio risk", content: <>
    <Explain>
      <p>Mixing two assets changes risk by less than the weighted average whenever they are not perfectly correlated. That gap is diversification:</p>
      <Formula>σₚ² = w²σ_A² + (1 − w)²σ_B² + 2w(1 − w)ρσ_Aσ_B</Formula>
      <p>Value at risk (VaR) is the loss exceeded in the worst 5% of years; expected shortfall is the average loss within that 5%. Under normal returns both have formulas, VaR = 1.645σ − μ. The simulation draws correlated normal returns with a Cholesky step, r<sub>B</sub> = ρz<sub>1</sub> + √(1 − ρ²)z<sub>2</sub>, and should agree with the formulas. Real returns have fatter tails than this model.</p>
    </Explain>
    <div className="grid-figure mt-8"><ClientOnly minHeight="64rem"><PortfolioDemo /></ClientOnly></div>
  </> },
  { id: "regression", label: "Linear regression", content: <>
    <Explain>
      <p>Ordinary least squares picks the line that minimises the sum of squared vertical distances. Because the data come from a known line, you can see how close the estimate gets:</p>
      <Formula>β̂ = Σ(x − x̄)(y − ȳ) / Σ(x − x̄)²,  SE(β̂) = √(σ̂² / Σ(x − x̄)²)</Formula>
      <p>A 95% confidence interval, β̂ ± 1.96·SE, does not mean a 95% chance that this interval is right. It means the procedure captures the true slope in about 95% of repeated samples. The coverage figure below checks that on 200 fresh samples.</p>
    </Explain>
    <div className="grid-figure mt-8"><ClientOnly minHeight="36rem"><RegressionDemo /></ClientOnly></div>
  </> },
  { id: "limits", label: "Method and limits", content: (
    <Container>
      <ul className="grid-main max-w-prose space-y-2 text-text-2">
        <li>Every number on this page comes from generated data with a visible seed. None of it describes a real asset, market, or study, and none of it is investment advice.</li>
        <li>Randomness comes from a seeded mulberry32 generator with Box–Muller normals. The same seed and settings always give the same result.</li>
        <li>Returns are modelled as normal. Real returns are skewed and fat-tailed, so these VaR figures understate real tail risk.</li>
        <li>Regression intervals use the normal critical value 1.96, a close approximation to the t distribution for n ≥ 30, which is why the slider starts at 30.</li>
        <li>The calculations run in your browser and are covered by unit tests in <code className="font-mono text-meta">lib/lab/</code>, including the closed-form checks and the 95% coverage property.</li>
      </ul>
    </Container>
  ) },
];

export default function LabPage() {
  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:z-10 focus:bg-surface focus:px-4 focus:py-2">Skip to content</a>
      <main id="main" tabIndex={-1} className="pb-section-sm lg:pb-section">
        <section aria-labelledby="overview">
          <Container className="gap-y-5 pt-8 lg:gap-y-6 lg:pt-24">
            <h1 id="overview" className="grid-figure scroll-mt-8 hero-datum pb-5 text-h1 lg:row-start-1 lg:pb-6">Research lab</h1>
            <SectionNavigation label="Lab sections" sections={[{ id: "overview", label: "Overview" }, ...sections.map(({ id, label }) => ({ id, label }))]}>
              <Link href="/" className="mb-4 inline-flex min-h-6 items-center font-mono text-meta">Back to home</Link>
            </SectionNavigation>
            <div className="grid-main max-w-prose lg:row-start-2">
              <p className="text-lead">Interactive demonstrations of methods used in quantitative research: simulation, portfolio risk, and statistical inference. Change a parameter and the result recomputes in your browser.</p>
              <p className="mt-4 text-text-2">These are educational demonstrations on synthetic data. They show how the methods behave. They are not research findings and not investment advice.</p>
            </div>
          </Container>
        </section>
        {sections.map(({ id, label, content }, index) => (
          <section key={id} aria-labelledby={id}>
            <SectionHeading id={id} index={String(index + 1).padStart(2, "0")}>{label}</SectionHeading>
            {id === "limits" ? content : <Container>{content}</Container>}
          </section>
        ))}
      </main>
    </>
  );
}
