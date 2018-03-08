import glamorous from 'glamorous'

const Base = glamorous.div({
  paddingLeft: 16,
  paddingRight: 16,
})

const Card = glamorous.div({
  padding: 24,
  marginBottom: 32,
  borderRadius: 10,
  boxShadow: '0 0 20px 0 rgba(3, 23, 44, 0.12)',
})

const Containers = {}

Containers.Base = Base
Containers.Card = Card

export default Containers
