// utils/privyErrors.ts
export function mapPrivyError(err: unknown): string | null {
    const raw = String((err as any)?.message ?? err ?? '');
    const code = raw.toLowerCase();

    // silent cancellations
    if (code.includes('exited_auth_flow') || code.includes('user_closed') || code.includes('cancelled')) {
        return null;
    }

    if (code.includes('not allowed')) return 'This login method is not enabled for this app.';
    if (code.includes('captcha')) return 'Captcha failed. Please try again.';
    return raw || 'Something went wrong. Please try again.';
}
