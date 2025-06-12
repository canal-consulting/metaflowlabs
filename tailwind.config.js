import TailwindTypography from '@tailwindcss/typography'

/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    extend: {
      typography: ({ theme }) => ({
        DEFAULT: {
          css: {
            '--tw-prose-body': 'var(--ui-text)',
            '--tw-prose-headings': 'var(--ui-text-highlighted)',
            '--tw-prose-lead': 'var(--ui-text-toned)',
            '--tw-prose-links': 'var(--ui-primary)',
            '--tw-prose-bold': 'var(--ui-text-highlighted)',
            '--tw-prose-counters': 'var(--ui-text-muted)',
            '--tw-prose-bullets': 'var(--ui-text-muted)',
            '--tw-prose-hr': 'var(--ui-border)',
            '--tw-prose-quotes': 'var(--ui-text-highlighted)',
            '--tw-prose-quote-borders': 'var(--ui-border-accented)',
            '--tw-prose-captions': 'var(--ui-text-muted)',
            '--tw-prose-code': 'var(--ui-text-highlighted)',
            '--tw-prose-pre-code': 'var(--ui-text)',
            '--tw-prose-pre-bg': 'var(--ui-bg-muted)',
            '--tw-prose-th-borders': 'var(--ui-border-accented)',
            '--tw-prose-td-borders': 'var(--ui-border)',
            '--tw-prose-links-hover': 'var(--color-primary-700)',
            'p': {
              marginTop: theme('spacing.4'),
              marginBottom: theme('spacing.4'),
              lineHeight: theme('lineHeight.relaxed'),
              color: 'var(--tw-prose-body)'
            },
            'a': {
              'color': 'var(--tw-prose-links)',
              'textDecoration': 'none',
              'fontWeight': theme('fontWeight.medium'),
              'transitionProperty': 'color, text-decoration-color',
              'transitionDuration': theme('transitionDuration.150'),
              'transitionTimingFunction': theme('transitionTimingFunction.in-out'),
              '&:hover': {
                color: 'var(--tw-prose-links-hover)',
                textDecoration: 'underline',
                textDecorationColor: 'var(--tw-prose-links-hover)'
              }
            },
            'h2': {
              lineHeight: theme('lineHeight.snug'),
              fontWeight: theme('fontWeight.bold'),
              color: 'var(--tw-prose-headings)',
              marginTop: theme('spacing.16'),
              marginBottom: theme('spacing.3'),
              paddingBottom: theme('spacing.3')
            }
          },
          invert: {
            css: {
              '--tw-prose-body': 'var(--ui-text)',
              '--tw-prose-headings': 'var(--ui-text-highlighted)',
              '--tw-prose-lead': 'var(--ui-text-toned)',
              '--tw-prose-links': 'var(--ui-primary)',
              '--tw-prose-bold': 'var(--ui-text-highlighted)',
              '--tw-prose-counters': 'var(--ui-text-muted)',
              '--tw-prose-bullets': 'var(--ui-text-muted)',
              '--tw-prose-hr': 'var(--ui-border)',
              '--tw-prose-quotes': 'var(--ui-text-highlighted)',
              '--tw-prose-quote-borders': 'var(--ui-border-accented)',
              '--tw-prose-captions': 'var(--ui-text-muted)',
              '--tw-prose-code': 'var(--ui-text-highlighted)',
              '--tw-prose-pre-code': 'var(--ui-text)',
              '--tw-prose-pre-bg': 'var(--ui-bg-muted)',
              '--tw-prose-th-borders': 'var(--ui-border-accented)',
              '--tw-prose-td-borders': 'var(--ui-border)',
              '--tw-prose-links-hover': 'var(--color-primary-400)',
              'p': {
                marginTop: theme('spacing.4'),
                marginBottom: theme('spacing.4'),
                lineHeight: theme('lineHeight.relaxed'),
                color: 'var(--tw-prose-body)'
              },
              'a': {
                'color': 'var(--tw-prose-links)',
                'textDecoration': 'none',
                'fontWeight': theme('fontWeight.medium'),
                'transitionProperty': 'color, text-decoration-color',
                'transitionDuration': theme('transitionDuration.150'),
                'transitionTimingFunction': theme('transitionTimingFunction.in-out'),
                '&:hover': {
                  color: 'var(--tw-prose-links-hover)',
                  textDecoration: 'underline',
                  textDecorationColor: 'var(--tw-prose-links-hover)'
                }
              },
              'h2': {
                lineHeight: theme('lineHeight.snug'),
                fontWeight: theme('fontWeight.bold'),
                color: 'var(--tw-prose-headings)',
                marginTop: theme('spacing.6'),
                marginBottom: theme('spacing.6'),
                paddingBottom: theme('spacing.3')
              }
            }
          }
        }
      })
    }
  },
  plugins: [TailwindTypography]
}
