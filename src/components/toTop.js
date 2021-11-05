function ToTop() {

  const backToTop = () => window.scrollTo(0, 0);

  return (
    <div className='back-top'>
      <button className='btn-top' onClick={backToTop}><i class="fas fa-angle-double-up"></i></button>
    </div>
  )
}

export default ToTop;