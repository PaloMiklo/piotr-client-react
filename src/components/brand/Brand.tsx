import { FC, ReactElement, useState } from 'react';
import LazyLoad from 'react-lazyload';
import { Link } from 'react-router-dom';
import { animated, useSpring } from 'react-spring';
import './Brand.scss';

const Brand: FC = (): ReactElement => {
    const [isHovered, setIsHovered] = useState(false);

    const props = useSpring({
        from: { opacity: 0, transform: 'translateY(-50px)' },
        to: { opacity: isHovered ? 0.8 : 1, transform: isHovered ? 'scale(1.1)' : 'scale(1)' },
        config: { tension: 200, friction: 20 },
    });

    const handleMouseEnter = (): void => setIsHovered(true);
    const handleMouseLeave = (): void => setIsHovered(false);

    return (
        <div className="container brand-wrapper">
            <Link to="/">
                <LazyLoad once>
                    <animated.div style={props}
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}>
                        <img className="img-fluid" src="/images/logo.png" loading="lazy" />
                    </animated.div>
                </LazyLoad>
            </Link>
        </div>
    )
}

export default Brand;