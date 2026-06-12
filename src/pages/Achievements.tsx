import {
  Award,
  FileBadge,
  GraduationCap,
  ScrollText,
  ArrowUpRight,
} from 'lucide-react'

import PageShell, { PageHeader } from '@/components/PageShell.tsx'
import Reveal from '@/components/Reveal.tsx'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'

// Add awards here to show the Awards section; empty hides it.
const awards: { name: string; org: string }[] = []

const certificates = [
  { name: 'MA University Completion', issuer: 'MA University', year: '2026' },
  { name: 'Python 3 Course', issuer: 'Codecademy', year: '2025' },
  {
    name: 'Claude 101',
    issuer: 'Skilljar',
    year: '2026',
    url: 'https://verify.skilljar.com/c/ms772yxayv9n',
  },
  {
    name: 'Claude Code 101',
    issuer: 'Skilljar',
    year: '2026',
    url: 'https://verify.skilljar.com/c/n44iv8sscqky',
  },
]

const skills = [
  'Lighting Design',
  'Python',
  'Photography',
  'UI / UX Design',
  'HTML & CSS',
  'Figma',
]

function SectionTitle({ index, children }: { index: string; children: string }) {
  return (
    <h2 className="display mb-6 flex items-baseline gap-3 border-b border-border pb-3 text-xl text-ink md:text-2xl">
      <span className="font-mono text-[10px] tracking-[0.2em] text-accent">{index}</span>
      {children}
    </h2>
  )
}

export default function Achievements() {
  return (
    <PageShell>
      <PageHeader kicker="03 // Milestones" title="Achieve" accent="ments" />

      <div className="grid items-start gap-12 lg:grid-cols-[1fr_340px]">
        <div className="space-y-12">
          <Reveal as="section">
            <SectionTitle index="B1">Skills</SectionTitle>
            <div className="flex flex-wrap gap-2.5">
              {skills.map((skill, i) => (
                <Reveal key={skill} as="span" delay={i * 0.06}>
                  <Badge variant="ghost" className="px-4 py-2 text-[11px]">
                    {skill}
                  </Badge>
                </Reveal>
              ))}
            </div>
          </Reveal>

          <Reveal as="section" delay={0.1}>
            <SectionTitle index="B2">Certificates</SectionTitle>
            <div className="grid gap-4 sm:grid-cols-2">
              {certificates.map((cert, i) => {
                const inner = (
                  <CardContent className="flex items-center gap-4 px-5">
                    <span className="flex size-10 shrink-0 items-center justify-center border border-primary/30 bg-primary/10 text-accent clip-corner-sm">
                      <FileBadge className="size-5" aria-hidden />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-sm font-medium text-ink">
                        {cert.name}
                      </span>
                      <span className="mt-0.5 block font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
                        {cert.issuer}
                      </span>
                    </span>
                    <span className="display shrink-0 text-base text-primary">
                      {cert.year}
                    </span>
                    {cert.url && (
                      <ArrowUpRight
                        className="size-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-primary"
                        aria-hidden
                      />
                    )}
                  </CardContent>
                )
                return (
                  <Reveal key={cert.name} delay={i * 0.08}>
                    {cert.url ? (
                      <a
                        href={cert.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group block no-underline"
                      >
                        <Card className="py-4 transition-all duration-300 hover:-translate-y-1 hover:border-primary/50">
                          {inner}
                        </Card>
                      </a>
                    ) : (
                      <Card className="py-4 transition-all duration-300 hover:-translate-y-1 hover:border-primary/50">
                        {inner}
                      </Card>
                    )}
                  </Reveal>
                )
              })}
            </div>
          </Reveal>
        </div>

        <aside className="space-y-12">
          <Reveal as="section" direction="right" delay={0.15}>
            <SectionTitle index="B3">Education</SectionTitle>
            <div className="flex flex-col gap-4">
              <Card className="py-4">
                <CardContent className="flex items-start gap-4 px-5">
                  <span className="flex size-10 shrink-0 items-center justify-center border border-primary/30 bg-primary/10 text-accent clip-corner-sm">
                    <GraduationCap className="size-5" aria-hidden />
                  </span>
                  <span>
                    <span className="block text-sm font-medium text-ink">
                      In <span className="text-primary">Highschool</span>
                    </span>
                    <span className="mt-0.5 block font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
                      Highroad Academy · Grad of <span className="text-primary">2027</span>
                    </span>
                  </span>
                </CardContent>
              </Card>
              <Card className="py-4">
                <CardContent className="flex items-start gap-4 px-5">
                  <span className="flex size-10 shrink-0 items-center justify-center border border-primary/30 bg-primary/10 text-accent clip-corner-sm">
                    <ScrollText className="size-5" aria-hidden />
                  </span>
                  <span>
                    <span className="block text-sm font-medium text-ink">
                      Certification Name
                    </span>
                    <span className="mt-0.5 block font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
                      NA
                    </span>
                  </span>
                </CardContent>
              </Card>
            </div>
          </Reveal>

          {awards.length > 0 && (
            <Reveal as="section" direction="right" delay={0.25}>
              <SectionTitle index="B4">Awards</SectionTitle>
              <div className="flex flex-col gap-4">
                {awards.map((award) => (
                  <Card key={award.name} className="py-4">
                    <CardContent className="flex items-center gap-4 px-5">
                      <span className="flex size-10 shrink-0 items-center justify-center border border-primary/30 bg-primary/10 text-accent clip-corner-sm">
                        <Award className="size-5" aria-hidden />
                      </span>
                      <span>
                        <span className="block text-sm font-medium text-ink">{award.name}</span>
                        <span className="mt-0.5 block font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
                          {award.org}
                        </span>
                      </span>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </Reveal>
          )}
        </aside>
      </div>
    </PageShell>
  )
}
