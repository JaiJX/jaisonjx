import * as React from 'react'

import { cn } from '@/lib/utils'

function Input({ className, type, ...props }: React.ComponentProps<'input'>) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        'flex h-11 w-full min-w-0 border border-input bg-card/80 px-4 py-2 font-mono text-sm text-foreground transition-colors outline-none clip-corner-sm',
        'placeholder:text-muted-foreground/60',
        'focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-ring/30',
        'disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50',
        className,
      )}
      {...props}
    />
  )
}

export { Input }
