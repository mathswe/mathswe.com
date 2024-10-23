// Copyright (c) 2024 Tobias Briones. All rights reserved.
// This file is part of https://github.com/mathswe/mathswe.com

import { GridItem } from "@ui/grid/GridItem.ts";
import React from "react";
import { Card, Col, Container, Row } from "react-bootstrap";

type GridItemsProps = {
    items: GridItem[]
}

const GridItems: React.FC<GridItemsProps> = ({ items }) => {
    return (
        <Container className="py-5">
            <Row xs={ 1 } sm={ 2 } className="g-4">
                { items.map((item, index) => (
                    <Col key={ index }>
                        <Card
                            className="h-100 p-3"
                            onClick={ () => window.open(
                                item.link,
                                "_blank",
                                "noopener noreferrer",
                            ) }
                            style={ { cursor: "pointer" } }
                        >
                            <Card.Img
                                variant="top"
                                src={ item.icon }
                                alt={ `${ item.title } icon` }
                                style={ {
                                    height: "10rem",
                                    objectFit: "contain",
                                } }
                            />
                            <Card.Body className="text-center">
                                <Card.Title
                                    style={ {
                                        fontWeight: "bold",
                                        fontSize: "calc(1.3rem + .6vw)",
                                    } }
                                >
                                    { item.title }
                                </Card.Title>
                                <Card.Text
                                    style={ {
                                        fontFamily: "Poppins Light, sans-serif",
                                        fontSize: "1.5rem",
                                    } }
                                >
                                    { item.description }
                                </Card.Text>
                                <Card.Text>
                                    { item.content }
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                )) }
            </Row>
        </Container>
    );
};

export default GridItems;
