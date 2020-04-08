import React, { useEffect, useRef } from 'react'

//tamaño de nuestra nave
const unit = 15;

const boardSize = 750;

export default function Board() {
    const canvasRef = useRef();
    //despues de cada render se pinta el grid solo una vez
    useEffect(function(){
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');

        context.beginPath();
            context.strokeStyle = '#001900';
            for (let i = unit * 2; i <= boardSize; i+= unit * 2){
                context.moveTo(i, 0);
                context.lineTo(i, boardSize)
            }
            for (let i = unit * 2; i <= boardSize; i+= unit * 2){
                context.moveTo(0, i);
                context.lineTo(boardSize, i)
            }
            
            context.stroke();
        context.closePath();
    }, []);
    return (
        <canvas ref={canvasRef} width={boardSize} height="750" className="board"/>
    );
}