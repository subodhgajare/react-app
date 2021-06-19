function Footer(props) {
  return (
    <footer className="footer">
      <div className="footer-top"></div>
      <div className="footer-widget"></div>
      <div className="footer-bottom">
        <div className="container">
          <div className="row">
            <p className="text-center">Copyright © 2021 <strong>{props.details.projectName}</strong>. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer