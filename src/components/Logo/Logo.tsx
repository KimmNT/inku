import style from "./Logo.module.scss";

export default function Logo() {
  return (
    <div className={style.Container}>
      <div className={style.Upper}></div>
      <div className={style.Lower}></div>

      <h1 className={style.Text}>Inku</h1>
    </div>
  );
}
