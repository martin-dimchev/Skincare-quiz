import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './Results.css';
import ProductCard from './ProductCard';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { FaArrowRight, FaArrowLeft } from 'react-icons/fa';

const NextArrow = ({ onClick, currentSlide, slideCount, slidesToShow }) => {
  // Hide next arrow if on last page
  if (currentSlide >= slideCount - slidesToShow) return null;

  return (
    <div className="custom-arrow next-arrow" onClick={onClick}>
      <FaArrowRight size={30} />
    </div>
  );
};

const PrevArrow = ({ onClick, currentSlide }) => {
  // Hide prev arrow if on first page
  if (currentSlide === 0) return null;

  return (
    <div className="custom-arrow prev-arrow" onClick={onClick}>
      <FaArrowLeft size={30} />
    </div>
  );
};

function Results() {
  const location = useLocation();
  const navigate = useNavigate();
  const [answers, setAnswers] = useState({});
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [error, setError] = useState('');
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    if (location.state && location.state.answers) {
      setAnswers(location.state.answers);
    } else {
      navigate('/quiz');
    }
  }, [location.state, navigate]);

  useEffect(() => {
    fetch('https://jeval.com.au/collections/hair-care/products.json?page=1')
      .then(response => response.json())
      .then(data => {
        setProducts(data.products);
      })
      .catch(error => {
        setError('Error fetching products: ' + error.message);
      });
  }, []);

  useEffect(() => {
    if (products.length > 0 && Object.keys(answers).length > 0) {
      const filtered = filterProducts();
      setFilteredProducts(filtered);
    }
  }, [products, answers]);

  const filterProducts = () => {
    return products.filter(product => {
      const searchTerms = extractSearchTerms(answers);
      const productText = `${product.title} ${product.body_html} ${product.tags.join(' ')}`.toLowerCase();

      return searchTerms.some(term =>
        productText.includes(term.toLowerCase())
      );
    });
  };

  const extractSearchTerms = (answers) => {
    const terms = [];

    Object.values(answers).forEach(answer => {
      const cleanAnswer = answer.replace(/^[a-z]\.\s*/i, '');

      const words = cleanAnswer.split(/[\s,&-]+/);
      terms.push(...words);

      terms.push(cleanAnswer);
    });

    return terms.filter(term => term.length > 2);
  };

  const handleRetakeQuiz = () => {
    navigate('/quiz');
  };

  const handleGoHome = () => {
    navigate('/');
  };

  if (error) {
    return <div className="error">{error}</div>;
  }

  // Calculate total slides = filtered products + 1 dummy card
  const totalSlides = filteredProducts.length + 1;

  return (
    <div className="results-container">
      <div className='banner'>
        <div className='overlay'>
          <div className='results-heading'>
            <h1 id='results-heading'>Build you everyday self care routine.</h1>
            <p>
              Perfect if you're after soft, healthy-looking hair, our nourishing shampoos and conditioners
              are infused with hair-loving ingredients that work with your hair’s natural structure to restore moisture and strength.
              With lightweight, gentle formulas, each wash leaves your hair feeling clean, smooth, and refreshed.
              Plus, with soothing scents, you can turn your hair care routine into a moment of daily self-care.
            </p>
            <button onClick={handleRetakeQuiz} className="retake-btn">
              Retake Quiz
            </button>
          </div>
        </div>
      </div>
      <div className="results-content">
        <Slider
          dots={true}
          infinite={false}
          speed={500}
          slidesToShow={3}
          slidesToScroll={3}
          nextArrow={
            <NextArrow
              currentSlide={currentSlide}
              slideCount={totalSlides}
              slidesToShow={3}
            />
          }
          prevArrow={<PrevArrow currentSlide={currentSlide} />}
          afterChange={(index) => setCurrentSlide(index)}
          responsive={[
            {
              breakpoint: 1024,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 1,
                dots: false,
              }
            },
            {
              breakpoint: 600,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
                dots: false,
              }
            }
          ]}
        >
          <div className='card'>
            <div className="product-card dummy-card">
              <div className="dummy-info">
                <h6>Daily routine</h6>
                Perfect if you're after soft, healthy-looking hair, our nourishing shampoos and conditioners are infused with hair-loving ingredients that work with your hair’s natural structure to restore moisture and strength. With lightweight, gentle formulas, each wash leaves your hair feeling clean, smooth, and refreshed.
              </div>
            </div>
          </div>
          {filteredProducts.map(product => (
            <div key={product.id}>
              <ProductCard product={product} />
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
}

export default Results;
