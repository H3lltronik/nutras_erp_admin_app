import { Spin } from "antd";

interface Props {
  isLoading: boolean;
}

export const AppLoader: React.FC<Props> = (props) => {
  const { isLoading } = props;

  if (!isLoading) {
    return null;
  }

  return (
    <div className="absolute inset-0 bg-gray-200 bg-opacity-50 flex justify-center items-center z-50">
      <Spin tip="Loading" size="large" className="bg-gray-200 bg-opacity-20">
        <div className="p-[50px] rounded-sm" />
      </Spin>
    </div>
  );
};
