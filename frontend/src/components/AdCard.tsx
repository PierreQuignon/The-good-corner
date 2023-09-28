export type AdType = {
  id: number;
  picture: string;
  title: string;
  price: number;
};

export type AdCardProps = AdType;

export function AdCard(props: AdCardProps): React.ReactNode {
  return (
    <div className="ad-card-container">
      <div className="ad-card-link">
        <img className="ad-card-image" src={`../../images/${props.picture}`}/>
        <div className="ad-card-text">
          <div className="ad-card-title">{props.title}</div>
          <div className="ad-card-price">{props.price} €</div>
        </div>
      </div>
    </div>
  );
}
