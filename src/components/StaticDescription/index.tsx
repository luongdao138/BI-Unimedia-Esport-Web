/* eslint-disable no-irregular-whitespace */
import { makeStyles } from '@material-ui/core/styles'
import { cutLinksIntoPieces } from '@utils/helpers/CommonHelper'
import { Link } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  description: {
    whiteSpace: 'pre-line',
    marginTop: 14,
    marginBottom: 23,
    fontSize: 14,
    wordBreak: 'break-word',
    overflowWrap: 'break-word',
    color: theme.palette.text.primary,
  },
  linkBreak: {
    wordWrap: 'break-word',
    wordBreak: 'break-word',
    color: theme.palette.text.primary,
  },
  row: {
    marginLeft: 30,
    whiteSpace: 'pre-line',
  },
  rowHeader: {},
  rowInner: {
    marginLeft: 10,
  },
  rowLast: {
    marginLeft: 22,
  },
}))

export default function StaticDescription() {
  const classes = useStyles()

  function formatDescription(description: string) {
    const pieces = cutLinksIntoPieces(description)
    return pieces.map((piece, index, _arr) => {
      if (piece.type === 'text') {
        return piece.text
      } else {
        return (
          <Link key={index} href={piece.text} target="_blank" className={classes.linkBreak}>
            {piece.text}
          </Link>
        )
      }
    })
  }
  return (
    <div className={classes.description}>
      <div className={classes.rowHeader}>{`■eXeLAB動画配信サービス`}</div>
      <div className={classes.row}>
        {`eXeLABでは、eXeLABユーザー向けに動画視聴機能の提供を開始しています。
        コミュニティイベントのライブ配信などでご利用いただけるライブ動画配信サービスです。`}
      </div>
      　　
      <div className={classes.rowHeader}>{`■ eXeLABの会員登録のお願い`}</div>
      <div className={classes.row}>{`本動画配信サービスをご利用いただくためには、株式会社NTTe-Sportsが提供・運営する
ゲーマー向け総合コミュニケーションプラットフォーム「eXeLAB」のユーザー会員登録が
必要です。`}</div>
      　　
      <div className={classes.rowHeader}>{`■利用規約の適用について`}</div>
      <div className={classes.row}>
        {formatDescription(`本サービスのご利用には、「eXeLAB」サービスの利用規約( https://info.exelab.jp/terms.html )、
及び動画配信サービスの個別規約( https://info.exelab.jp/terms.html#movie )をご承諾いただく
必要があります。`)}
      </div>
      　　
      <div className={classes.rowHeader}>{`■「eXeLAB」ログインパスワードの紛失にご注意ください`}</div>
      <div className={classes.row}>{`本サービスのご利用には、「eXeLAB」サービスへのログインが必要になります。
     ログインパスワードを紛失しますと、サービスがご利用いただけませんのでご注意ください。
     ログインパスワードの再設定は「eXeLAB」のスマホアプリよりご利用ください。
     なお、パスワードの入力ミスが連続する場合、ログインが24時間ロックされますので、
     連続してのパスワード入力ミスには十分ご注意下さい。`}</div>
      　　
      <div className={classes.rowHeader}>{`■eXeLABの動画配信サービスでライブ配信を希望されるお客様へ`}</div>
      <div className={classes.row}>
        {`コミュニティイベント等のライブ配信のご希望を承ります。`}　
        <div className={classes.rowInner}>{`・eXeLABユーザー向けに有料チケットを販売しての有料配信
      ・eXeLABの限定ユーザ―向けのプライベートなライブ配信　など`}</div>
        {`詳細は、是非お問い合わせください。`}
        <div className={classes.rowLast}>{formatDescription(`（問い合わせ先：https://www.ntte-sports.co.jp/contact/ ）`)}</div>
      </div>
    </div>
  )
}
