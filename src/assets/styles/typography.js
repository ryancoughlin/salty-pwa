import glamorous from 'glamorous'
import Colors from './colors'
import Spacing from './spacing'

const bodyFontFamily = 'Inter UI'
const numericFontFamily = 'overpass-mono'

const TidePhrase = glamorous.h1({
  fontSize: 34,
  fontFamily: bodyFontFamily,
  color: Colors.baseTextColor,
  lineHeight: 1.3,
})

const SmallNumericType = glamorous.span({
  fontFamily: numericFontFamily,
  fontSize: 15,
})

const Type = {}

Type.TidePhrase = TidePhrase
Type.SmallNumericType = SmallNumericType

export default Type
