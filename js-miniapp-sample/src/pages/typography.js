import React, { useEffect, useState } from 'react';

import {
  CardContent,
  FormControlLabel,
  makeStyles,
  Slider,
  Switch,
  Tab,
  Tabs,
  Typography,
} from '@material-ui/core';

import GreyCard from '../components/GreyCard';

const GENERAL_FONTS =
  '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, "Hiragino Sans", "Hiragino Kaku Gothic ProN", "Noto Sans JP", "Yu Gothic", Meiryo, sans-serif';
const RAKUTEN_FONTS =
  '"Rakuten Sans JP-2", "Rakuten Sans UI", ' + GENERAL_FONTS;

const FONT_BASE_PATH = '/';
const FONT_TEST_SAMPLE =
  'The quick brown fox jumps over the lazy dog — 素早い茶色のキツネが怠け者の犬を飛び越えた';

const FONTS = [
  {
    file: 'RakutenSansJP2-Regular.ttf',
    weight: '100 400',
    fontWeight: '400',
    family: 'Rakuten Sans JP-2',
  },
  {
    file: 'RakutenSansJP2-Medium.ttf',
    weight: '500',
    fontWeight: '500',
    family: 'Rakuten Sans JP-2',
  },
  {
    file: 'RakutenSansJP2-DemiBold.ttf',
    weight: '600',
    fontWeight: '600',
    family: 'Rakuten Sans JP-2',
  },
  {
    file: 'RakutenSansJP2-Bold.ttf',
    weight: '700 900',
    fontWeight: '700',
    family: 'Rakuten Sans JP-2',
  },
  {
    file: 'RakutenSansUIApp_Regular.ttf',
    weight: '100 400',
    fontWeight: '400',
    family: 'Rakuten Sans UI',
  },
  {
    file: 'RakutenSansUIApp_SemiBold.ttf',
    weight: '600',
    fontWeight: '600',
    family: 'Rakuten Sans UI',
  },
  {
    file: 'RakutenSansUIApp_Bold.ttf',
    weight: '700 900',
    fontWeight: '700',
    family: 'Rakuten Sans UI',
  },
];

function displayName(filename) {
  return filename.replace(/\.(ttf|otf)$/i, '');
}

function fileFormat(filename) {
  const m = filename.match(/\.(ttf|otf)$/i);
  return m ? m[1].toUpperCase() : '';
}

function badgeClass(status, classes) {
  switch (status) {
    case 'loaded':
      return classes.ftLoaded;
    case 'failed':
      return classes.ftFailed;
    default:
      return classes.ftPending;
  }
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    height: '100%',
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
  fontName: {
    fontSize: 10,
    fontFamily: 'monospace',
    color: theme.palette.grey[400],
    marginBottom: 2,
  },
  sampleRow: {
    marginBottom: theme.spacing(1.5),
  },
  htmlSection: {
    backgroundColor: 'white',
    borderRadius: '1em',
    padding: '1em',
    marginBottom: theme.spacing(3),
    '& h1, & h2, & h3, & h4, & h5, & h6, & p, & blockquote, & pre': {
      margin: '0.4em 0',
    },
    '& blockquote': {
      borderLeft: `3px solid ${theme.palette.grey[300]}`,
      paddingLeft: '0.75em',
      color: theme.palette.grey[600],
      margin: '0.5em 0',
    },
    '& code, & kbd, & samp': {
      fontFamily: 'monospace',
      backgroundColor: theme.palette.grey[100],
      padding: '0.1em 0.3em',
      borderRadius: 3,
      fontSize: '0.9em',
    },
    '& kbd': {
      border: `1px solid ${theme.palette.grey[400]}`,
      borderBottomWidth: 2,
    },
    '& mark': {
      backgroundColor: '#fff3a3',
      padding: '0 0.2em',
    },
    '& hr': {
      border: 'none',
      borderTop: `1px solid ${theme.palette.grey[200]}`,
      margin: '0.75em 0',
    },
  },
  htmlRow: {
    marginBottom: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    borderBottom: `1px solid ${theme.palette.grey[100]}`,
  },
  htmlTag: {
    display: 'inline-block',
    fontSize: 10,
    color: theme.palette.grey[400],
    fontFamily: 'monospace',
    marginRight: 6,
    minWidth: 90,
    verticalAlign: 'middle',
  },
  sliderRow: {
    marginBottom: theme.spacing(2),
    padding: theme.spacing(1, 2),
    backgroundColor: theme.palette.grey[100],
    borderRadius: 8,
  },
  sliderLabel: {
    display: 'block',
    marginBottom: theme.spacing(0.5),
    color: theme.palette.grey[700],
  },
  // Font Test tab styles
  ftRoot: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    boxSizing: 'border-box',
  },
  ftMetricsBar: {
    background: '#1a1a2e',
    color: '#e0e0e0',
    borderRadius: '8px',
    padding: '12px 16px',
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
    fontFamily: 'monospace',
    fontSize: '12px',
  },
  ftMetricRow: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  ftMetricValue: {
    color: '#7ee8a2',
    fontWeight: 'bold',
  },
  ftFontCard: {
    border: '1px solid #e0e0e0',
    borderRadius: '8px',
    padding: '12px 16px',
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
    background: '#fafafa',
  },
  ftFontCardHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  ftFontName: {
    fontSize: '12px',
    fontFamily: 'monospace',
    fontWeight: 'bold',
    color: theme.color.primary,
  },
  ftFormatBadge: {
    fontSize: '10px',
    fontFamily: 'monospace',
    fontWeight: 'bold',
    padding: '1px 5px',
    borderRadius: '3px',
    background: '#e8eaf6',
    color: '#3949ab',
    marginLeft: '6px',
    verticalAlign: 'middle',
  },
  ftTiming: {
    fontSize: '11px',
    fontFamily: 'monospace',
    color: '#888',
  },
  ftFontSample: {
    fontSize: '16px',
    lineHeight: 1.5,
    color: theme.color.primary,
  },
  ftLoadBadge: {
    fontSize: '11px',
    fontFamily: 'monospace',
    padding: '2px 8px',
    borderRadius: '4px',
    alignSelf: 'flex-start',
  },
  ftLoaded: { background: '#e6f4ea', color: '#1e7e34' },
  ftFailed: { background: '#fce8e6', color: '#c5221f' },
  ftPending: { background: '#fff8e1', color: '#f57f17' },
}));

const SAMPLES = [
  {
    variant: 'h1',
    label: 'Heading 1',
    en: 'The Quick Brown Fox',
    jp: '日本語タイポグラフィ',
  },
  {
    variant: 'h2',
    label: 'Heading 2',
    en: 'Jumps Over The Lazy Dog',
    jp: 'フォントの表示例',
  },
  {
    variant: 'h3',
    label: 'Heading 3',
    en: 'Typography Scale',
    jp: 'テキストサイズの確認',
  },
  {
    variant: 'h4',
    label: 'Heading 4',
    en: 'Font Rendering Demo',
    jp: '見出しスタイル',
  },
  {
    variant: 'h5',
    label: 'Heading 5',
    en: 'English Sample Text',
    jp: 'サブタイトルの例',
  },
  {
    variant: 'h6',
    label: 'Heading 6',
    en: 'Subtitle Text Style',
    jp: '小見出しテキスト',
  },
  {
    variant: 'body1',
    label: 'Body 1',
    en: 'The quick brown fox jumps over the lazy dog. Pack my box with five dozen liquor jugs.',
    jp: '吾輩は猫である。名前はまだ無い。どこで生れたか頓と見当がつかぬ。何でも薄暗いじめじめした所でニャーニャー泣いていた事だけは記憶している。',
  },
  {
    variant: 'body2',
    label: 'Body 2',
    en: 'Sphinx of black quartz, judge my vow. How vexingly quick daft zebras jump!',
    jp: 'いろはにほへと　ちりぬるを　わかよたれそ　つねならむ　うゐのおくやま　けふこえて　あさきゆめみし　ゑひもせす',
  },
  {
    variant: 'caption',
    label: 'Caption',
    en: 'Caption text — used for labels and annotations.',
    jp: 'キャプション — ラベルや注釈に使用します。',
  },
  {
    variant: 'overline',
    label: 'Overline',
    en: 'Overline Label',
    jp: 'オーバーラインラベル',
  },
];

const FONT_WEIGHT_NAMES = {
  100: 'Thin',
  200: 'Extra Thin',
  300: 'Light',
  400: 'Regular',
  500: 'Medium',
  600: 'Semi Bold',
  700: 'Bold (CSS bold)',
  800: 'Extra Bold',
  900: 'Black',
};

const HTML_ROWS = [
  {
    tag: 'h1',
    en: <h1>Heading 1</h1>,
    jp: <h1>見出し1</h1>,
  },
  {
    tag: 'h2',
    en: <h2>Heading 2</h2>,
    jp: <h2>見出し2</h2>,
  },
  {
    tag: 'h3',
    en: <h3>Heading 3</h3>,
    jp: <h3>見出し3</h3>,
  },
  {
    tag: 'h4',
    en: <h4>Heading 4</h4>,
    jp: <h4>見出し4</h4>,
  },
  {
    tag: 'h5',
    en: <h5>Heading 5</h5>,
    jp: <h5>見出し5</h5>,
  },
  {
    tag: 'h6',
    en: <h6>Heading 6</h6>,
    jp: <h6>見出し6</h6>,
  },
  {
    tag: 'p',
    en: <p>Paragraph — the quick brown fox jumps over the lazy dog.</p>,
    jp: <p>段落 — 吾輩は猫である。名前はまだ無い。</p>,
  },
  {
    tag: 'blockquote',
    en: (
      <blockquote>Blockquote — a cited passage from another source.</blockquote>
    ),
    jp: <blockquote>引用 — 他の文献からの引用文です。</blockquote>,
  },
  {
    tag: 'strong',
    en: (
      <p>
        <strong>Strong</strong> — bold importance.
      </p>
    ),
    jp: (
      <p>
        <strong>強調</strong> — 重要な内容を示します。
      </p>
    ),
  },
  {
    tag: 'em',
    en: (
      <p>
        <em>Em</em> — italic emphasis.
      </p>
    ),
    jp: (
      <p>
        <em>強調</em> — イタリック体の強調です。
      </p>
    ),
  },
  {
    tag: 'small',
    en: (
      <p>
        <small>Small — fine print, side comments.</small>
      </p>
    ),
    jp: (
      <p>
        <small>小文字 — 注釈や補足説明に使用します。</small>
      </p>
    ),
  },
  {
    tag: 'mark',
    en: (
      <p>
        <mark>Mark</mark> — highlighted text.
      </p>
    ),
    jp: (
      <p>
        <mark>マーク</mark> — ハイライトされたテキスト。
      </p>
    ),
  },
  {
    tag: 's',
    en: (
      <p>
        <s>Strikethrough</s> — no longer accurate.
      </p>
    ),
    jp: (
      <p>
        <s>取り消し線</s> — 無効になった内容。
      </p>
    ),
  },
  {
    tag: 'u',
    en: (
      <p>
        <u>Underline</u> — underlined text.
      </p>
    ),
    jp: (
      <p>
        <u>下線</u> — 下線付きテキスト。
      </p>
    ),
  },
  {
    tag: 'del / ins',
    en: (
      <p>
        <del>Deleted</del> / <ins>Inserted</ins> — tracked changes.
      </p>
    ),
    jp: (
      <p>
        <del>削除</del> / <ins>挿入</ins> — 変更の追跡。
      </p>
    ),
  },
  {
    tag: 'sub / sup',
    en: (
      <p>
        H<sub>2</sub>O and E=mc<sup>2</sup>
      </p>
    ),
    jp: (
      <p>
        H<sub>2</sub>O と E=mc<sup>2</sup>
      </p>
    ),
  },
  {
    tag: 'abbr',
    en: (
      <p>
        <abbr title="HyperText Markup Language">HTML</abbr> — abbreviation.
      </p>
    ),
    jp: (
      <p>
        <abbr title="ハイパーテキスト・マークアップ・ランゲージ">HTML</abbr> —
        略語。
      </p>
    ),
  },
  {
    tag: 'cite',
    en: (
      <p>
        <cite>The Great Gatsby</cite> — a cited work title.
      </p>
    ),
    jp: (
      <p>
        <cite>吾輩は猫である</cite> — 作品名の引用。
      </p>
    ),
  },
  {
    tag: 'code',
    en: (
      <p>
        <code>const x = 42;</code> — inline code.
      </p>
    ),
    jp: (
      <p>
        <code>const x = 42;</code> — インラインコード。
      </p>
    ),
  },
  {
    tag: 'kbd',
    en: (
      <p>
        Press <kbd>Ctrl</kbd> + <kbd>C</kbd> to copy.
      </p>
    ),
    jp: (
      <p>
        <kbd>Ctrl</kbd> + <kbd>C</kbd> でコピー。
      </p>
    ),
  },
  {
    tag: 'samp',
    en: (
      <p>
        Output: <samp>Hello, World!</samp>
      </p>
    ),
    jp: (
      <p>
        出力: <samp>こんにちは、世界！</samp>
      </p>
    ),
  },
  {
    tag: 'var',
    en: (
      <p>
        The variable <var>n</var> is an integer.
      </p>
    ),
    jp: (
      <p>
        変数 <var>n</var> は整数です。
      </p>
    ),
  },
];

const TypographyPage = () => {
  const classes = useStyles();
  const [tab, setTab] = useState(0);
  const [useRakuten, setUseRakuten] = useState(true);
  const [fontWeight, setFontWeight] = useState(400);

  const [fontData, setFontData] = useState(
    Object.fromEntries(
      FONTS.map(({ file }) => [file, { status: 'loading', durationMs: null }])
    )
  );
  const [totalMs, setTotalMs] = useState(null);

  useEffect(() => {
    const batchStart = performance.now();
    let settled = 0;

    FONTS.forEach(({ file, weight, family }) => {
      const ext = file.endsWith('.otf') ? 'opentype' : 'truetype';
      const url = `${FONT_BASE_PATH}${file}`;
      const t0 = performance.now();
      const face = new FontFace(family, `url(${url}) format('${ext}')`, {
        weight,
      });

      face
        .load()
        .then((loaded) => {
          document.fonts.add(loaded);
          const dur = Math.round(performance.now() - t0);
          setFontData((prev) => ({
            ...prev,
            [file]: { status: 'loaded', durationMs: dur },
          }));
        })
        .catch(() => {
          const dur = Math.round(performance.now() - t0);
          setFontData((prev) => ({
            ...prev,
            [file]: { status: 'failed', durationMs: dur },
          }));
        })
        .then(() => {
          settled += 1;
          if (settled === FONTS.length) {
            setTotalMs(Math.round(performance.now() - batchStart));
          }
        });
    });
  }, []);

  const loadedCount = Object.values(fontData).filter(
    (d) => d.status === 'loaded'
  ).length;
  const failedCount = Object.values(fontData).filter(
    (d) => d.status === 'failed'
  ).length;
  const pendingCount = Object.values(fontData).filter(
    (d) => d.status === 'loading'
  ).length;

  let totalMsLabel;
  if (totalMs !== null) totalMsLabel = `${totalMs} ms`;
  else if (pendingCount > 0) totalMsLabel = '…';
  else totalMsLabel = '—';

  const fontFamily = useRakuten ? RAKUTEN_FONTS : GENERAL_FONTS;

  return (
    <GreyCard className={classes.root} style={{ fontFamily }}>
      <CardContent>
        <Tabs
          value={tab}
          onChange={(_, v) => setTab(v)}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
        >
          <Tab label="Font Test" />
          <Tab label="MUI Components" />
          <Tab label="HTML Elements" />
        </Tabs>

        {tab === 0 && (
          <div className={classes.ftRoot}>
            <div className={classes.ftMetricsBar}>
              <div className={classes.ftMetricRow}>
                <span>Total time</span>
                <span className={classes.ftMetricValue}>{totalMsLabel}</span>
              </div>
              <div className={classes.ftMetricRow}>
                <span>Loaded</span>
                <span className={classes.ftMetricValue}>
                  {loadedCount} / {FONTS.length}
                </span>
              </div>
              <div className={classes.ftMetricRow}>
                <span>Failed</span>
                <span
                  style={{
                    color: failedCount > 0 ? '#ff6b6b' : '#7ee8a2',
                    fontWeight: 'bold',
                  }}
                >
                  {failedCount}
                </span>
              </div>
              <div className={classes.ftMetricRow}>
                <span>Pending</span>
                <span
                  style={{
                    color: pendingCount > 0 ? '#ffd93d' : '#7ee8a2',
                    fontWeight: 'bold',
                  }}
                >
                  {pendingCount}
                </span>
              </div>
            </div>

            {FONTS.map(({ file, fontWeight }) => {
              const data = fontData[file] ?? {
                status: 'loading',
                durationMs: null,
              };
              return (
                <div key={file} className={classes.ftFontCard}>
                  <div className={classes.ftFontCardHeader}>
                    <span className={classes.ftFontName}>
                      {displayName(file)}
                      <span className={classes.ftFormatBadge}>
                        {fileFormat(file)}
                      </span>
                    </span>
                    <span className={classes.ftTiming}>
                      {data.durationMs !== null ? `${data.durationMs} ms` : '…'}
                    </span>
                  </div>
                  <span
                    className={`${classes.ftLoadBadge} ${badgeClass(
                      data.status,
                      classes
                    )}`}
                  >
                    {data.status}
                  </span>
                  <Typography
                    className={classes.ftFontSample}
                    style={{ fontFamily, fontWeight }}
                  >
                    {FONT_TEST_SAMPLE}
                  </Typography>
                </div>
              );
            })}
          </div>
        )}

        {tab !== 0 && (
          <>
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

            <div className={classes.sliderRow}>
              <Typography
                variant="caption"
                className={classes.sliderLabel}
                style={{ fontFamily: RAKUTEN_FONTS }}
              >
                Font Weight: {fontWeight} — {FONT_WEIGHT_NAMES[fontWeight]}
              </Typography>
              <Slider
                value={fontWeight}
                onChange={(_, val) => setFontWeight(val)}
                min={100}
                max={900}
                step={100}
                marks
                valueLabelDisplay="auto"
              />
            </div>
          </>
        )}

        {tab === 1 && (
          <div className={classes.section} style={{ fontFamily, fontWeight }}>
            <div className={classes.fontName}>
              {useRakuten ? 'Rakuten Fonts' : 'General Fonts'} <br />
              Font-Family: {fontFamily}
            </div>
            {SAMPLES.map(({ variant, label, en, jp }) => (
              <div key={variant} className={classes.sampleRow}>
                <Typography
                  variant={variant}
                  style={{ fontWeight }}
                  gutterBottom
                >
                  {en}
                </Typography>
                <Typography
                  variant={variant}
                  style={{ fontWeight }}
                  gutterBottom
                >
                  {jp}
                </Typography>
                <div className={classes.fontLabel}>{label}</div>
              </div>
            ))}
          </div>
        )}

        {tab === 2 && (
          <div className={classes.htmlSection}>
            <div className={classes.fontName}>
              {useRakuten ? 'Rakuten Fonts' : 'General Fonts'} <br />
              Font-Family: {fontFamily}
            </div>
            <div className={classes.sectionTitle}>HTML Text Elements</div>
            {HTML_ROWS.map(({ tag, en, jp }) => (
              <div key={tag} className={classes.htmlRow}>
                <span className={classes.htmlTag}>&lt;{tag}&gt;</span>
                <div style={{ fontWeight }}>{en}</div>
                <div style={{ fontWeight }}>{jp}</div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </GreyCard>
  );
};

export default TypographyPage;
