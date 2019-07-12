export const paper = "📝"
export const rock = "🗿"
export const scissor = "✂️"
export const choices = [rock, paper, scissor]

export const getBeater = choice =>
  choice === rock ? paper : choice === paper ? scissor : rock
