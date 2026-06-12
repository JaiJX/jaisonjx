import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const buttonVariants = cva(
  "sweep inline-flex items-center justify-center gap-2 whitespace-nowrap font-mono text-xs font-semibold uppercase tracking-[0.18em] transition-colors duration-200 cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 clip-corner-sm",
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:text-background',
        outline:
          'border-2 border-primary bg-transparent text-primary hover:border-ink hover:text-background',
        ghost:
          'text-muted-foreground hover:text-primary [&.sweep]:overflow-visible [&::before]:hidden',
        link: 'text-primary underline-offset-4 hover:underline [&::before]:hidden',
      },
      size: {
        default: 'h-11 px-7 py-2',
        sm: 'h-9 px-5',
        lg: 'h-13 px-9 text-sm',
        icon: 'size-11',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : 'button'
  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
