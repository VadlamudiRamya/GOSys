import React from 'react';
import { FaStar, FaStarHalfAlt } from 'react-icons/fa';
import { AiOutlineStar } from 'react-icons/ai';
import styles from './StarRating.module.css';

const StarRating = ({ rating }) => {
  const stars = [];
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 !== 0;

  for (let i = 0; i < fullStars; i++) {
    stars.push(<FaStar key={`full_${i}`} className={styles.star} />);
  }

  if (halfStar) {
    stars.push(<FaStarHalfAlt key="half" className={styles.star} />);
  }

  const emptyStars = 5 - stars.length;
  for (let i = 0; i < emptyStars; i++) {
    stars.push(<AiOutlineStar key={`empty_${i}`} className={`${styles.star} ${styles.emptyStar}`} />);
  }

  return <div className={styles.starRatingContainer}>{stars}</div>;
};

export default StarRating;
