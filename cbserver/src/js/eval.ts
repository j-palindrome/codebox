function text(input: string) {
  try {
    eval(input)
  } catch (err) {
    if (err instanceof Error) outlet(0, 'error', err.message, err.stack)
  }
}
