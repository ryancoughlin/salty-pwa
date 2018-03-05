import glamorous from 'glamorous'
import Colors from './colors'

const numericFontFamily = 'overpass-mono, Menlo, Monaco, monospace'
const mediumFontWeight = 500
const semiBoldFontWeight = 600
const boldFontWeight = 700

const TidePhrase = glamorous.h1({
  fontSize: 34,
  fontWeight: boldFontWeight,
  color: Colors.baseTextColor,
  lineHeight: 1.3,
})

const SmallNumericType = glamorous.span({
  fontFamily: numericFontFamily,
  fontSize: 15,
})

const SecondaryHeader = glamorous.h2(
  {
    fontSize: 20,
    fontWeight: mediumFontWeight,
    marginBottom: 6,
  },
  props => ({
    marginBottom: props.marginBottom,
  }),
)

const Body = glamorous.h3({
  fontSize: 18,
  color: Colors.baseTextColor,
  fontWeight: 'normal',
})

const SmallBody = glamorous.h4({
  fontSize: 15,
  fontWeight: mediumFontWeight,
})

const Time = glamorous.time({
  fontFamily: numericFontFamily,
  fontSize: 15,
})

const Type = {}

Type.TidePhrase = TidePhrase
Type.SmallNumericType = SmallNumericType
Type.Body = Body
Type.Time = Time
Type.SmallBody = SmallBody
Type.SecondaryHeader = SecondaryHeader

export default Type
