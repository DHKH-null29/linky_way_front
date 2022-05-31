import AnimatedIcon from './icons/AnimatedIcon';
import IconTag from '../components/IconTag';

const TagList = () => {
  return (
    <div>
      <AnimatedIcon.SkipBack />
      <IconTag>김아무개</IconTag>
      <IconTag>이아무개</IconTag>
      <IconTag>이아무개</IconTag>
      <IconTag>이아무개</IconTag>
      <IconTag>이아무개</IconTag>
      <AnimatedIcon.SkipForward />
    </div>
  );
};

export default TagList;
