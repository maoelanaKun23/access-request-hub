import {Font} from '@react-pdf/renderer'
import sfProBold from '/assets/fonts/SFProText-Bold.ttf'
import sfProRegular from '/assets/fonts/SFProText-Regular.ttf'

Font.register({
  family: 'SF Pro Text',
  fonts: [
    {src: sfProRegular, fontWeight: 'normal'},
    {src: sfProBold, fontWeight: 'bold'},
  ],
})
