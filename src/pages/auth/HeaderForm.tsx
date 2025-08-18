import logo from "../../assets/afreight-logo.png";

export default function HeaderForm(props: { title: string }) {
  const { title } = props;
  return (
    <>
      <div className="d-flex justify-content-center mb-2">
        <img src={logo} alt="truck-delivery" />
      </div>
      <div className="d-flex justify-content-center">
        <h2>{title}</h2>
      </div>
    </>
  );
}
