const LayoutStyles = theme => ({

    layout: props => ({
          display :"flex",
          flexDirection :props.direction,
          justifyContent:props.justify,
          backgroundColor : (theme.layout.bgcolor) ? theme.layout.bgcolor : props.bgcolor,
          
      }),
  
  
  
  });
  export default LayoutStyles;
  