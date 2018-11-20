import glamorous from 'glamorous';
import Colors from './colors';

const numericFontFamily = 'overpass-mono, Menlo, Monaco, monospace';
const mediumFontWeight = 500;
const boldFontWeight = 700;

const TideDirection = glamorous.div({
  fontSize: 36,
  fontWeight: boldFontWeight,
  color: Colors.Dark,
});

const SmallNumericType = glamorous.span({
  fontFamily: numericFontFamily,
  fontSize: 15,
});

const SecondaryHeader = glamorous.div(
  {
    fontSize: 22,
    fontWeight: mediumFontWeight,
    marginBottom: 10,
  },
  props => ({
    marginBottom: props.marginBottom,
  }),
);

const Body = glamorous.div({
  fontSize: 18,
  color: Colors.Dark,
  fontWeight: 'normal',
});

const Text = glamorous.div({
  fontSize: 15,
  lineHeight: 1.4,
});

const TextMedium = glamorous.h4({
  fontSize: 15,
  fontWeight: mediumFontWeight,
  lineHeight: 1,
});

const Time = glamorous.time({
  fontFamily: numericFontFamily,
  fontSize: 15,
});

const Type = {};

Type.TideDirection = TideDirection;
Type.SmallNumericType = SmallNumericType;
Type.Body = Body;
Type.Time = Time;
Type.Text = Text;
Type.TextMedium = TextMedium;
Type.SecondaryHeader = SecondaryHeader;

export default Type;
