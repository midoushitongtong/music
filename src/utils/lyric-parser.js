// 复制 lyric-parser 库的代码后进行修改
const timeExp = /\[(\d{2,}):(\d{2})(?:\.(\d{2,3}))?]/g;

const tagRegMap = {
  title: 'ti',
  artist: 'ar',
  album: 'al',
  offset: 'offset',
  by: 'by',
};

// eslint-disable-next-line @typescript-eslint/no-empty-function
function noop() {}

export default class Lyric {
  constructor(lrc, hanlder = noop) {
    this.lrc = lrc;
    this.tags = {};
    this.lines = [];
    this.handler = hanlder;
    this.curLine = 0;

    this._init();
  }

  _init() {
    this._initTag();

    this._initLines();
  }

  _initTag() {
    for (let tag in tagRegMap) {
      const matches = this.lrc.match(new RegExp(`\\[${tagRegMap[tag]}:([^\\]]*)]`, 'i'));
      this.tags[tag] = (matches && matches[1]) || '';
    }
  }

  _initLines() {
    const lines = this.lrc.split('\n');
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      let result = timeExp.exec(line);
      if (result) {
        const txt = line.replace(timeExp, '').trim();
        if (txt) {
          this.lines.push({
            time: result[1] * 60 * 1000 + result[2] * 1000 + (result[3] || 0) * 10,
            txt,
          });
        }
      }
    }

    this.lines.sort((a, b) => {
      return a.time - b.time;
    });
  }

  findCurNum(time) {
    for (let i = 0; i < this.lines.length; i++) {
      if (time <= this.lines[i].time) {
        return i;
      }
    }
    return this.lines.length;
  }
}
