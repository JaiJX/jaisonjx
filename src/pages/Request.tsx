import { useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, Copy, Send } from 'lucide-react'

import PageShell, { PageHeader } from '@/components/PageShell.tsx'
import Reveal from '@/components/Reveal.tsx'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'

const EMAIL = 'jaison@jaisonjx.me'

const siteTypes = ['Portfolio', 'Small business', 'Event or landing page', 'Something else']
const timelines = ['No rush', 'Within a month', 'As soon as possible']

const label = 'mb-2 block font-mono text-[10px] font-medium uppercase tracking-[0.2em] text-muted-foreground'

// Same look as <Input>, for the controls it doesn't cover.
const control =
  'w-full min-w-0 border border-input bg-card/80 px-4 py-2 font-mono text-sm text-foreground transition-colors outline-none clip-corner-sm placeholder:text-muted-foreground/60 focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-ring/30'

/**
 * "Request a site" form. The site is static with no backend, so submitting
 * opens the visitor's email app with the request filled in.
 */
export default function Request() {
  const [siteType, setSiteType] = useState(siteTypes[0])
  const [sent, setSent] = useState(false)
  const [copied, setCopied] = useState(false)

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    const name = String(data.get('name')).trim()
    const subject = `Site request: ${siteType} from ${name}`
    const body = [
      `Name: ${name}`,
      `Email: ${data.get('email')}`,
      `Type of site: ${siteType}`,
      `Timeline: ${data.get('timeline')}`,
      '',
      String(data.get('details')).trim(),
    ].join('\n')
    window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    setSent(true)
  }

  function copyEmail() {
    navigator.clipboard
      ?.writeText(EMAIL)
      .then(() => setCopied(true))
      .catch(() => {})
  }

  return (
    <PageShell>
      <PageHeader
        kicker="Req // New site"
        title="Request "
        accent="a site"
        sub="Need a website? Tell me what you have in mind and I will get back to you about whether I can build it."
      />

      <Reveal>
        <Card className="max-w-2xl">
          <CardContent>
            {sent ? (
              <div className="flex flex-col gap-5" role="status">
                <p className="font-mono text-[11px] font-medium uppercase tracking-[0.24em] text-accent">
                  <span className="blink mr-2 inline-block size-1.5 bg-primary" aria-hidden />
                  Almost done
                </p>
                <p className="max-w-xl text-sm leading-relaxed text-ink-soft/85 md:text-base">
                  Your email app should have opened with the request filled in. Press send there to
                  finish. If nothing opened, email the details to{' '}
                  <span className="font-mono text-accent select-all">{EMAIL}</span>.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Button type="button" variant="outline" size="sm" onClick={copyEmail}>
                    {copied ? 'Copied' : 'Copy email address'} <Copy />
                  </Button>
                  <Button type="button" variant="ghost" size="sm" onClick={() => setSent(false)}>
                    <ArrowLeft /> Edit request
                  </Button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                <div className="grid gap-6 sm:grid-cols-2">
                  <div>
                    <label htmlFor="req-name" className={label}>Your name</label>
                    <Input id="req-name" name="name" required autoComplete="name" />
                  </div>
                  <div>
                    <label htmlFor="req-email" className={label}>Your email</label>
                    <Input id="req-email" name="email" type="email" required autoComplete="email" />
                  </div>
                </div>

                <fieldset className="m-0 border-0 p-0">
                  <legend className={label}>Type of site</legend>
                  <div className="flex flex-wrap gap-2">
                    {siteTypes.map((t) => (
                      <button
                        key={t}
                        type="button"
                        aria-pressed={siteType === t}
                        onClick={() => setSiteType(t)}
                        className={cn(
                          'cursor-pointer px-3 py-1.5 font-mono text-[10px] font-medium uppercase tracking-[0.16em] transition-colors clip-corner-sm',
                          siteType === t
                            ? 'bg-primary text-primary-foreground'
                            : 'border border-primary/40 bg-primary/5 text-accent hover:bg-primary/15',
                        )}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </fieldset>

                <div>
                  <label htmlFor="req-timeline" className={label}>Timeline</label>
                  <select id="req-timeline" name="timeline" className={cn(control, 'h-11 sm:max-w-xs')}>
                    {timelines.map((t) => (
                      <option key={t}>{t}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="req-details" className={label}>What should the site do?</label>
                  <textarea
                    id="req-details"
                    name="details"
                    required
                    rows={6}
                    placeholder="Who it's for, the pages you need, sites you like the look of..."
                    className={cn(control, 'resize-y py-3 font-sans leading-relaxed')}
                  />
                </div>

                <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
                  <Button type="submit" size="lg">
                    Send request <Send />
                  </Button>
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                    Opens your email app
                  </span>
                </div>
              </form>
            )}
          </CardContent>
        </Card>
      </Reveal>

      <Link
        to="/"
        className="mt-8 inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground no-underline hover:text-primary"
      >
        <ArrowLeft className="size-3.5" /> Back to gateway
      </Link>
    </PageShell>
  )
}
