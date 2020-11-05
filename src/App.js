import React, {useState, useEffect } from 'react';
import alanBtn from '@alan-ai/alan-sdk-web'
import wordTonumbers from 'words-to-numbers'
import NewsCards from './components/NewsCards/NewsCards'
import useStyles from './style.js'
const alankey = '5b9ada6fb5fc087d699746bac003cc962e956eca572e1d8b807a3e2338fdd0dc/stage';

const App = () =>{
    const [newsArticles, setNewArticles]= useState([]);
    const [activeArticle, setActiveArticle] = useState(-1);
    const classes= useStyles();
useEffect(()=>{
            alanBtn ({
                key : alankey,
                onCommand: ({ command, articles, number })=>{
                    if (command === 'newHeadlines') {
                       setNewArticles(articles)
                       setActiveArticle(-1)
                    }else if(command === 'highlight'){
                        setActiveArticle((prevActiveArticle) => prevActiveArticle + 1 );
                    } else if ( command === 'open'){
                       const parsedNumber = number.length > 2 ? wordTonumbers(number, {fuzzy:true}) : number;
                        const article = articles[parsedNumber -1 ];
                        if (parsedNumber > 20 ) {
                            alanBtn().playText('please try again')  
                        } else if (article){
                            window.open( article.url , '_blank');
                        alanBtn().playText('opening')
                        }
                       
                    }
                }
            })
        }, []
    )
    return (
        <div className={classes.logoontainer}> 
        <p  className={classes.text}>ARTIFICIAL-INTELLIGENCE</p>
        <p className={classes.text}>News Reader</p>
       
      
        <NewsCards articles={newsArticles}  activeArticle={activeArticle}/>
        </div>
    );
}
export default App;
