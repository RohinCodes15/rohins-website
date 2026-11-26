import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { test } from "node:test";
import { certifications } from "../content/certifications.ts";
import { journal } from "../content/journal.ts";
import { leadership } from "../content/leadership.ts";
import { site } from "../content/site.ts";
import { projects } from "../content/projects.ts";
import { research } from "../content/research.ts";
import { duplicateSlugs, findBySlug, projectTitleTransition, projectsByStack } from "./content.ts";
import type { Project, StackId } from "./types.ts";

const project = (slug: string, stack: string[]): Project => ({
  slug,
  title: slug,
  summary: "",
  role: "",
  year: 2026,
  status: "in-development",
  statusNote: "",
  stack: stack as StackId[],
  outcomes: [],
  links: [],
  featured: false,
});

test("registries have unique slugs", () => {
  assert.deepEqual(duplicateSlugs(projects), []);
  assert.deepEqual(duplicateSlugs(research), []);
});

test("duplicateSlugs reports each repeated slug once", () => {
  assert.deepEqual(duplicateSlugs([{ slug: "a" }, { slug: "b" }, { slug: "a" }, { slug: "a" }]), ["a"]);
});

test("findBySlug returns the match or undefined", () => {
  const items = [project("a", []), project("b", [])];
  assert.equal(findBySlug(items, "b"), items[1]);
  assert.equal(findBySlug(items, "c"), undefined);
});

test("projectsByStack keeps registry order", () => {
  const items = [project("a", ["x"]), project("b", ["y"]), project("c", ["x", "y"])];
  assert.deepEqual(
    projectsByStack(items, "x" as StackId).map((p) => p.slug),
    ["a", "c"],
  );
});

test("every project states its status and sources every outcome", () => {
  for (const { slug, status, statusNote, outcomes } of projects) {
    assert.ok(["completed", "in-development"].includes(status), slug);
    assert.ok(statusNote.trim(), `${slug} needs a status note`);
    for (const { value, source } of outcomes) assert.ok(source.trim(), `${slug}: ${value} has no source`);
  }
});

test("case-study figures point at real files in public/", () => {
  for (const { slug, caseStudy } of projects) {
    for (const { src, alt, caption } of caseStudy?.figures ?? []) {
      assert.ok(existsSync(new URL(`../public${src}`, import.meta.url)), `${slug}: ${src} is missing`);
      assert.ok(alt.trim() && caption.trim(), `${slug}: ${src} needs alt text and a caption`);
    }
  }
});


test("leadership and certification links are https", () => {
  for (const { verifyUrl } of certifications) assert.match(verifyUrl, /^https:\/\//);
  for (const { link } of leadership) if (link) assert.match(link.href, /^https:\/\//);
});

test("journal entries have unique slugs, ISO dates, and real figure files", () => {
  assert.deepEqual(duplicateSlugs(journal), []);
  for (const { slug, published, body } of journal) {
    assert.match(published, /^\d{4}-\d{2}-\d{2}$/, slug);
    for (const block of body) {
      if (block.type === "figure") assert.ok(existsSync(new URL(`../public${block.figure.src}`, import.meta.url)), `${slug}: ${block.figure.src}`);
    }
  }
});

test("contact details are well formed and the résumé file exists when listed", () => {
  if (site.email) assert.match(site.email, /^[^\s@]+@[^\s@]+\.[^\s@]+$/);
  for (const { href } of site.links) assert.match(href, /^https:\/\//);
  if (site.resume) assert.ok(existsSync(new URL(`../public${site.resume.href}`, import.meta.url)), site.resume.href);
});

test("project title transition names are valid CSS identifiers and unique per project", () => {
  assert.equal(projectTitleTransition("accessforge"), "project-accessforge");
  assert.equal(projectTitleTransition("Risk Lens.v2"), "project-risk-lens-v2");
  const names = projects.map(({ slug }) => projectTitleTransition(slug));
  assert.equal(new Set(names).size, names.length);
});
