/**
 * Print out a readable pass/fail status
 */
export default (success) => {
  return (success === true) ? 'was successful' : 'failed'
}