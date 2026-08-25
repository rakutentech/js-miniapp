import React, { useState } from 'react';

import {
  CardContent,
  FormControlLabel,
  makeStyles,
  Switch,
  Typography,
} from '@material-ui/core';

import GreyCard from '../components/GreyCard';

const GENERAL_FONTS_EN = '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif';
const GENERAL_FONTS_JP = '"Hiragino Sans", "Hiragino Kaku Gothic ProN", "Noto Sans JP", "Yu Gothic", Meiryo, sans-serif';
const RAKUTEN_FONTS_EN = '"Rakuten Sans UI", ' + GENERAL_FONTS_EN;
const RAKUTEN_FONTS_JP = '"Rakuten Sans JP", ' + GENERAL_FONTS_JP;

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: '90%',
    padding: theme.spacing(2),
  },
  toggleRow: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: theme.spacing(2),
    padding: theme.spacing(1, 2),
    backgroundColor: theme.palette.grey[100],
    borderRadius: 8,
  },
  section: {
    backgroundColor: 'white',
    borderRadius: '1em',
    padding: '1em',
    marginBottom: theme.spacing(3),
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: 700,
    letterSpacing: '0.1em',
    textTransform: 'uppercase',
    color: theme.palette.grey[600],
    marginBottom: theme.spacing(1),
    borderBottom: `1px solid ${theme.palette.grey[300]}`,
    paddingBottom: theme.spacing(0.5),
  },
  fontLabel: {
    fontSize: 11,
    color: theme.palette.grey[500],
    marginTop: theme.spacing(0.25),
    marginBottom: theme.spacing(1.5),
    fontStyle: 'italic',
  },
  sampleRow: {
    marginBottom: theme.spacing(1.5),
  },
}));

const ENGLISH_SAMPLES = [
  { variant: 'h1', label: 'Heading 1', text: 'The Quick Brown Fox' },
  { variant: 'h2', label: 'Heading 2', text: 'Jumps Over The Lazy Dog' },
  { variant: 'h3', label: 'Heading 3', text: 'Typography Scale' },
  { variant: 'h4', label: 'Heading 4', text: 'Font Rendering Demo' },
  { variant: 'h5', label: 'Heading 5', text: 'English Sample Text' },
  { variant: 'h6', label: 'Heading 6', text: 'Subtitle Text Style' },
  { variant: 'body1', label: 'Body 1', text: 'The quick brown fox jumps over the lazy dog. Pack my box with five dozen liquor jugs.' },
  { variant: 'body2', label: 'Body 2', text: 'Sphinx of black quartz, judge my vow. How vexingly quick daft zebras jump!' },
  { variant: 'caption', label: 'Caption', text: 'Caption text — used for labels and annotations.' },
  { variant: 'overline', label: 'Overline', text: 'Overline Label' },
];

const JAPANESE_SAMPLES = [
  { variant: 'h1', label: 'Heading 1', text: '日本語タイポグラフィ' },
  { variant: 'h2', label: 'Heading 2', text: 'フォントの表示例' },
  { variant: 'h3', label: 'Heading 3', text: 'テキストサイズの確認' },
  { variant: 'h4', label: 'Heading 4', text: '見出しスタイル' },
  { variant: 'h5', label: 'Heading 5', text: 'サブタイトルの例' },
  { variant: 'h6', label: 'Heading 6', text: '小見出しテキスト' },
  { variant: 'body1', label: 'Body 1', text: '吾輩は猫である。名前はまだ無い。どこで生れたか頓と見当がつかぬ。何でも薄暗いじめじめした所でニャーニャー泣いていた事だけは記憶している。' },
  { variant: 'body2', label: 'Body 2', text: 'いろはにほへと　ちりぬるを　わかよたれそ　つねならむ　うゐのおくやま　けふこえて　あさきゆめみし　ゑひもせす' },
  { variant: 'caption', label: 'Caption', text: 'キャプション — ラベルや注釈に使用します。' },
  { variant: 'overline', label: 'Overline', text: 'オーバーラインラベル' },
];

const TypographyPage = () => {
  const classes = useStyles();
  const [useRakuten, setUseRakuten] = useState(true);

  const fontEN = useRakuten ? RAKUTEN_FONTS_EN : GENERAL_FONTS_EN;
  const fontJP = useRakuten ? RAKUTEN_FONTS_JP : GENERAL_FONTS_JP;
  const fontLabel = useRakuten ? 'Rakuten Sans UI / Rakuten Sans JP' : 'System / General Fonts';

  return (
    <GreyCard className={classes.root}>
      <CardContent>
        <div className={classes.toggleRow}>
          <FormControlLabel
            control={
              <Switch
                checked={useRakuten}
                onChange={(e) => setUseRakuten(e.target.checked)}
                color="primary"
              />
            }
            label={useRakuten ? 'Rakuten Sans' : 'General Fonts'}
          />
        </div>

        <div className={classes.section}>
          <div className={classes.sectionTitle}>English</div>
          <div className={classes.fontLabel}>{fontEN}</div>
          {ENGLISH_SAMPLES.map(({ variant, label, text }) => (
            <div key={variant} className={classes.sampleRow}>
              <Typography
                variant={variant}
                style={{ fontFamily: fontEN }}
                gutterBottom
              >
                {text}
              </Typography>
              <div className={classes.fontLabel}>{label}</div>
            </div>
          ))}
        </div>

        <div className={classes.section}>
          <div className={classes.sectionTitle}>日本語 (Japanese)</div>
          <div className={classes.fontLabel}>{fontJP}</div>
          {JAPANESE_SAMPLES.map(({ variant, label, text }) => (
            <div key={variant} className={classes.sampleRow}>
              <Typography
                variant={variant}
                style={{ fontFamily: fontJP }}
                gutterBottom
              >
                {text}
              </Typography>
              <div className={classes.fontLabel}>{label}</div>
            </div>
          ))}
        </div>
      </CardContent>
    </GreyCard>
  );
};

export default TypographyPage;
