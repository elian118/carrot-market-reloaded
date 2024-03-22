type FormBtnProps = {
  loading: boolean;
  text: string;
};
const FormBtn = ({ loading, text }: FormBtnProps) => {
  return (
    <button
      className="primary-btn h-10 disabled:bg-neutral-400 disabled:text-neutral-300 disabled:cursor-not-allowed"
      disabled={loading}
    >
      {loading ? '로딩 중' : text}
    </button>
  );
};

export default FormBtn;
