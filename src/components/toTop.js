function ToTop() {

    const backToTop = () => window.scrollTo(0,0);

    return(
        <button className='btn-top' onClick={backToTop}><i class="fas fa-angle-double-up"></i></button>
    )
}

export default ToTop;