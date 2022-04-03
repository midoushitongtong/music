import { ref, onMounted } from 'vue';

type Props = {
  audioSelector: string;
};

const useAudio = (props: Props) => {
  const audioRef = ref<HTMLAudioElement | undefined>(undefined);

  // play
  const play = () => {
    if (!audioRef.value) {
      console.log('audioRef 为空, 无法进行操作');
      return;
    }

    audioRef.value.play().catch((error: any) => {
      // 当前会有两种情况进到此 catch
      // 1. 调用 play() 的时候, 还没开始播放就调用了 pause(), 此时 play() 会被 pause() 打断从而进入此 catch, 这种情况不需要处理
      // 2. 切换歌曲太快, 第一首 play() 还未开始播放, 切换到第二首 play(), 这时候第一首 play() 会被打算进入此 catch, 这种情况不需要处理
      console.log(error);
    });
  };

  // pause
  const pause = () => {
    if (!audioRef.value) {
      console.log('audioRef 为空, 无法进行操作');
      return;
    }

    audioRef.value.pause();
  };

  // update attr
  const updateAttr = (attr: 'src' | 'volume' | 'currentTime', value: any) => {
    if (!audioRef.value) {
      console.log('audioRef 为空, 无法进行操作');
      return;
    }

    // @ts-ignore
    audioRef.value[attr] = value;
  };

  onMounted(() => {
    // @ts-ignore
    audioRef.value = document.querySelector(props.audioSelector);
  });

  return {
    audioRef,
    play,
    pause,
    updateAttr,
  };
};

export default useAudio;
