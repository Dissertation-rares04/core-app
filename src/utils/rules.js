const rules = {
  required () {
    const message = 'Required'
    return value => value !== undefined && value !== null && value !== '' || message
  }
}

export { rules }
