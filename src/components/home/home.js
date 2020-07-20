import React from 'react'
import './home.css'
import Axios from 'axios'
import Moment from 'moment'
const apiKey='5a677cc95f3842eb87a52ed86311176b'
class Home extends React.Component{
    constructor(props){
        super(props)
        this.state={
            data:[],
            category:'politics',
            search:'',
			selected:[],
			top:[],
			loading:true,
			main:true
        }
    }
    componentDidMount(){
       Axios.get('https://newsapi.org/v2/everything?' +
      `q=all&sortBy=publishedAt&language=en&` +
       `apiKey=${apiKey}`)
	   .then(res=>this.setState({data:res.data.articles,loading:false}))
	   Axios.get('https://newsapi.org/v2/everything?' +
        `q=politics&sortBy=publishedAt&language=en&` +
        `apiKey=${apiKey}`)
		.then(res=>this.setState({selected:res.data.articles,main:false}))
		Axios.get('https://newsapi.org/v2/top-headlines?' +
        `q=politics&sortBy=publishedAt&language=en&` +
        `apiKey=${apiKey}`)
        .then(res=>this.setState({top:res.data.articles}))
    }
    setCategory=(e)=>{
        
        this.setState({category:e.target.id,main:true})
        Axios.get('https://newsapi.org/v2/everything?' +
        `q=${e.target.id}&sortBy=publishedAt&language=en&` +
        `apiKey=${apiKey}`)
		.then(res=>this.setState({selected:res.data.articles,main:false}))
		Axios.get('https://newsapi.org/v2/top-headlines?' +
        `q=${e.target.id}&sortBy=publishedAt&language=en&` +
        `apiKey=${apiKey}`)
        .then(res=>this.setState({top:res.data.articles}))
    }
    setSearch=(e)=>{
        this.setState({search:e.target.value})
    }
    search=(e)=>{
		e.preventDefault()
		this.setState({search:'',main:true})
        Axios.get('https://newsapi.org/v2/everything?' +
        `q=${this.state.search}&sortBy=publishedAt&language=en&` +
        `apiKey=${apiKey}`)
		.then(res=>this.setState({selected:res.data.articles,main:false}))
		Axios.get('https://newsapi.org/v2/top-headlines?' +
        `q=${this.state.search}&sortBy=publishedAt&language=en&` +
        `apiKey=${apiKey}`)
        .then(res=>this.setState({top:res.data.articles}))
    }
    
    render(){
		
        console.log(this.state.selected)
        console.log(this.state.top)
        return(
            <React.Fragment>
          <header>
		<div class="top-head left">
			<div class="container">
				<div class="row">
					<div class="col-md-6 col-lg-4">
						<h1>Triveous News<small>Get the latest News</small></h1>
					</div>
				</div>
			</div>
		</div>
	</header>
	<section class="top-nav " >
		<nav class="navbar navbar-expand-lg py-0">
			<div class="container">
				<button class="navbar-toggler" type="button" data-toggle="collapse"
					data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
					aria-label="Toggle navigation">
					<span class="navbar-toggler-icon"></span>
				</button>
				<div class="collapse navbar-collapse" id="exCollapsingNavbar2">
					<ul class="nav navbar-nav ">
						<li class="nav-item active" id='all'  onClick={(e)=>this.setCategory(e)}>Home <span
									class="sr-only">(current)</span></li>
						<li class="nav-item" id='world'  onClick={(e)=>this.setCategory(e)}>World</li>
						<li class="nav-item" id='politics' onClick={(e)=>this.setCategory(e)}>Politics</li>
						<li class="nav-item" id='business'  onClick={(e)=>this.setCategory(e)}>Business</li>
						<li class="nav-item" id='science'  onClick={(e)=>this.setCategory(e)}>Science</li>
						<li class="nav-item" id='sports'  onClick={(e)=>this.setCategory(e)}>Sports</li>
						<li class="nav-item" id='technology'  onClick={(e)=>this.setCategory(e)}>Tech</li>
						<li class="nav-item" id='travel'  onClick={(e)=>this.setCategory(e)}>Travel</li>
						<li class="nav-item" id='health' onClick={(e)=>this.setCategory(e)}>Health</li>
					</ul>
					<form class="ml-auto">
						<div class="search">
							<input type="text" class="form-control" maxlength="64" placeholder="Search by categories" onChange={(e)=>this.setSearch(e)} value={this.state.search}/>
							<button type="submit" class="btn btn-search" onClick={(e)=>this.search(e)}><i class="fa fa-search"></i></button>
						</div>
					</form>
				</div>
			</div>
		</nav>
	</section> 
    <section class="banner-sec">
		<div class="container">
		
		{this.state.loading?<div class="loader">Loading...</div>:<div class="row">
			{this.state.data.map(value=>
				<div class="col-md-3">
                    
					<div class="card"> <img class="img-fluid"
							src={value.urlToImage} alt=""/>
						{/*<div class="card-img-overlay"> <span class="badge badge-pill badge-danger">{this.state.category==='all'?'News':this.state.category}</span> </div>*/}
						<div class="card-body">
							<div class="news-title">
								<h2 class=" title-small"><a href={value.url}>{value.title}</a>
								</h2>
							</div>
							<p class="card-text"><small class="text-time"><em>{Moment(value.publishedAt).fromNow()}</em></small></p>
						</div>
					</div>
				</div>
				)}
				
		
		</div>}
		</div>
	</section>
    <section class="section-01">
		<div class="container">
		{this.state.main?<div class="loader">Loading...</div>:<div class="row">
				<div class="col-lg-8 col-md-12">
					<h3 class="heading-large">{this.state.category}</h3>
					<div class="">
					{this.state.selected.map(value=>
						<div class="col-lg-6 card">
                            
							<div class="card"> <img class="img-fluid"
									src={value.urlToImage} alt=""/>
								<div class="card-body">
									<div class="news-title"><a href={value.url}>
											<h2 class=" title-small">{value.title}</h2>
										</a></div>
									<p class="card-text">{value.description}</p>
									<p class="card-text"><small class="text-time"><em>{Moment(value.publishedAt).fromNow()}</em></small></p>
								</div>
							</div>
						</div>
						)}
						
				</div>
				<aside class="col-lg-4 side-bar col-md-12">
					<ul class="nav nav-tabs" role="tablist" id="myTab" >
						
						<li class="nav-item " style={{marginLeft:'20px'}}> <a class="nav-link active" data-toggle="tab" href="#profile" role="tab">Top</a>
						</li>
						
					</ul>

					
					<div class="tab-content sidebar-tabing" id="nav-tabContent">
						<div class="tab-pane active" id="profile" role="tabpanel">
							{this.state.top.map(value=>
							<div class="media"> <a href={value.url}> <img class="d-flex mr-3 ml-4" src={value.urlToImage}/></a>
								<div class="media-body">
									<div class="news-title">
										<h2 class="title-small"><a href={value.url}>{value.title}</a></h2>
									</div>
									<div class="news-auther"><span class="time">{Moment(value.publishedAt).fromNow()}</span></div>
								</div>
							</div>)}
							
						</div>
					</div>
				</aside>
			</div>
		</div>}
        </div>
	</section>
    </React.Fragment>
        )
    }
}
export default Home;
