import React, { useEffect, useState } from 'react';
import { BsArrowLeftCircleFill, BsArrowRightCircleFill } from 'react-icons/bs';

import './styles.css';

interface IProps {
    url: string;
    page?: number;
    limit?: number;
    loadingComponent?: React.ReactNode;
    errorComponent?: React.ReactNode;
}

interface IImage {
    id: string;
    download_url: string;
    value: string;
    index: number; 
    array: string[];
}

const ImageSlider = (props: IProps) => {
    const {url, limit, page = 1, loadingComponent = 'Loading...', errorComponent = 'Error!'} = props;

    const [images, setImages] = useState<IImage[]>([]);
    const [currentImage, setCurrentImage] = useState<number>(0);
    const [errorMsg, setErrorMsg] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const fetchImages = async (getUrl: string) => {
        setLoading(true);
        try {
            const response = await fetch(`${getUrl}?page=${page}&limit=${limit}`);
            const data = await response.json();
            if (data) setImages(data);
        } catch (error: any) {
            console.error(error);
            setErrorMsg(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchImages(url);
    }, []);

    const handlePrevious = () => currentImage === 0 ? setCurrentImage(images.length - 1) : setCurrentImage(currentImage - 1);
    const handleNext = () => (currentImage === images.length - 1) ? setCurrentImage(0) : setCurrentImage(currentImage + 1);
    const handleButtonClick = (currentIndex: number) => setCurrentImage(currentIndex);

    if (loading) return <div>{loadingComponent}</div>;
    if (errorMsg) return <div>{errorComponent}</div>;

    return (
        <div className='container'>
            <BsArrowLeftCircleFill onClick={handlePrevious} className='arrow arrow-left' />

            {
                images && images.length > 0 ?
                images.map((imageItem: IImage, index: number) => 
                    <img 
                        key={imageItem.id} 
                        alt={imageItem.download_url } 
                        className={`current-image ${currentImage === index ? '' : 'hide-current-image'}`} 
                        src={imageItem.download_url } 
                    />) 
                    : null
            }

            <BsArrowRightCircleFill onClick={handleNext} className='arrow arrow-right' />

            <span className='circle-indicators'>
                {
                    images && images.length > 0 ? 
                    images.map((_, index) => (
                        <button 
                            onClick={() => handleButtonClick(index)} 
                            key={`button_${index}`} 
                            className={`current-indicator ${currentImage === index ? '' : 'inactive-indicator'}`}
                        />
                    ))
                    : null
                }
            </span>
        </div>
    );
}

export default ImageSlider;