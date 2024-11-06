import { breakpoints } from '@/config';

export function textTruncate(
  text: string,
  maxLengthMobile: number = 50,
  maxLengthDesktop: number = 100
) {
  // Use matchMedia to dynamically check breakpoints
  const isMobile = window.matchMedia(breakpoints.xs).matches;

  // Set the character limit based on the current screen size
  const maxLength = isMobile ? maxLengthMobile : maxLengthDesktop;

  // Truncate the text if it exceeds the maximum length
  if (text.length > maxLength) {
    return text.slice(0, maxLength) + '...';
  }

  return text;
}
