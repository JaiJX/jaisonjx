import type { CSSProperties } from 'react'
import {
  Camera,
  Palette,
  Code2,
  Music,
  Plane,
  BookOpen,
  Film,
  Leaf,
  Gamepad2,
  Mail,
} from 'lucide-react'

import { InstagramIcon, LinkedInIcon, GitHubIcon } from '@/components/BrandIcons.tsx'

import PageShell, { PageHeader } from '@/components/PageShell.tsx'
import Reveal from '@/components/Reveal.tsx'
import Logo from '@/components/Logo.tsx'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

const skills = [
  { name: 'UI / UX Design', level: 90 },
  { name: 'HTML & CSS', level: 85 },
  { name: 'JavaScript', level: 75 },
  { name: 'Photography', level: 80 },
  { name: 'Figma', level: 88 },
]

const interests = [
  { icon: Camera, label: 'Photography' },
  { icon: Palette, label: 'Design' },
  { icon: Code2, label: 'Coding' },
  { icon: Music, label: 'Music' },
  { icon: Plane, label: 'Travel' },
  { icon: BookOpen, label: 'Reading' },
  { icon: Film, label: 'Film' },
  { icon: Leaf, label: 'Nature' },
]

const contacts = [
  {
    icon: InstagramIcon,
    label: 'Instagram / jjaison_jiji',
    href: 'https://www.instagram.com/jjaison_jiji/',
  },
  { icon: Gamepad2, label: 'Discord / JaiJ', href: undefined },
  {
    icon: LinkedInIcon,
    label: 'LinkedIn / Jaison Jiji',
    href: 'https://linkedin.com/in/jaison-jiji-48b5a838b',
  },
  { icon: GitHubIcon, label: 'github.com/JaiJX', href: 'https://github.com/JaiJX' },
]

export default function About() {
  return (
    <PageShell>
      <PageHeader kicker="02 // Who I am" title="About " accent="Me" />

      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {/* Bio — spans two columns */}
        <Reveal className="md:col-span-2">
          <Card className="h-full">
            <CardHeader className="flex-row items-center gap-5">
              <div className="relative shrink-0">
                <div className="spin-slow absolute -inset-2 border border-dashed border-primary/30" aria-hidden />
                <Logo className="relative block size-20" />
              </div>
              <div>
                <CardTitle className="text-2xl">Jaison Jiji</CardTitle>
                <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.22em] text-accent">
                  Product Designer × Creative Developer
                </p>
              </div>
            </CardHeader>
            <CardContent className="space-y-4 text-sm leading-relaxed text-ink-soft/85">
              <p>
                Hey! I'm Jaison — a designer and developer who believes great
                products come from understanding people first. I love working at
                the intersection of design and technology, building things that
                are both beautiful and useful.
              </p>
              <p>
                When I'm not at a screen, I'm usually out with my camera,
                chasing light and finding stories in everyday moments.
              </p>
            </CardContent>
          </Card>
        </Reveal>

        {/* Skills with animated bars */}
        <Reveal delay={0.1}>
          <Card className="h-full">
            <CardHeader>
              <CardTitle>
                <span className="mr-2 font-mono text-[10px] text-accent">A1</span>
                Skills
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              {skills.map(({ name, level }) => (
                <div key={name}>
                  <div className="mb-1.5 flex items-baseline justify-between font-mono text-[11px] uppercase tracking-[0.14em] text-ink-soft">
                    <span>{name}</span>
                    <span className="text-accent">{level}%</span>
                  </div>
                  <div className="h-1.5 bg-primary/10 clip-blade">
                    <div
                      className="bar-fill h-full bg-gradient-to-r from-solar-200 to-solar-400"
                      style={{ '--bar-w': `${level}%` } as CSSProperties}
                    />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </Reveal>

        {/* Interests */}
        <Reveal delay={0.05}>
          <Card className="h-full">
            <CardHeader>
              <CardTitle>
                <span className="mr-2 font-mono text-[10px] text-accent">A2</span>
                Interests
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-2">
              {interests.map(({ icon: Icon, label }) => (
                <Badge key={label} variant="outline" className="py-1.5">
                  <Icon aria-hidden /> {label}
                </Badge>
              ))}
            </CardContent>
          </Card>
        </Reveal>

        {/* Contact */}
        <Reveal delay={0.15} className="md:col-span-2">
          <Card className="h-full" id="contact">
            <CardHeader>
              <CardTitle>
                <span className="mr-2 font-mono text-[10px] text-accent">A3</span>
                Get in touch
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                Have a project in mind or just want to say hi?
              </p>
            </CardHeader>
            <CardContent className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
              <ul className="flex list-none flex-col gap-3">
                {contacts.map(({ icon: Icon, label, href }) => {
                  const row = (
                    <>
                      <span className="flex size-8 items-center justify-center border border-primary/30 bg-primary/10 text-accent clip-corner-sm">
                        <Icon className="size-4" aria-hidden />
                      </span>
                      <span className="font-mono text-xs tracking-wide">{label}</span>
                    </>
                  )
                  return (
                    <li key={label}>
                      {href ? (
                        <a
                          href={href}
                          target="_blank"
                          rel="noreferrer"
                          className="group flex items-center gap-3 text-ink-soft no-underline transition-colors hover:text-primary"
                        >
                          {row}
                        </a>
                      ) : (
                        <span className="flex items-center gap-3 text-ink-soft">{row}</span>
                      )}
                    </li>
                  )
                })}
              </ul>
              <Button asChild size="lg">
                <a href="mailto:jaison@jaisonjx.me">
                  Say hello <Mail />
                </a>
              </Button>
            </CardContent>
          </Card>
        </Reveal>
      </div>
    </PageShell>
  )
}
