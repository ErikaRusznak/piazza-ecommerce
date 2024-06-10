package com.ozius.internship.project.service.filtering;

import com.ozius.internship.project.dto.OrderDTO;
import com.ozius.internship.project.entity.order.Order;
import com.ozius.internship.project.service.filtering.builders.PagingJpaQueryBuilder;
import com.ozius.internship.project.service.filtering.filter.FilterSpecs;
import com.ozius.internship.project.service.filtering.sort.SortSpecs;
import com.ozius.internship.project.service.filtering.transformers.ModelMapperBasedResultTransformer;
import com.ozius.internship.project.service.filtering.transformers.ResultTransformer;
import jakarta.persistence.EntityManager;
import org.modelmapper.ModelMapper;

import static org.apache.commons.lang3.ObjectUtils.isNotEmpty;

public class OrderPaginationSearchQuery extends PagingJpaQueryBuilder<Order, OrderDTO> {

    private final ModelMapper modelMapper;
    public OrderPaginationSearchQuery(ModelMapper modelMapper, EntityManager em) {
        super("select o from Order o ", em, Order.class);
        this.modelMapper = modelMapper;

        mapCriteriaToPropertyPath("orderStatus", "o.orderStatus");
        mapCriteriaToPropertyPath("sellerAlias", "o.seller.alias");
        mapCriteriaToPropertyPath("orderDate", "o.orderDate");
    }

    @Override
    public String orderByDefault() {
        return "o.id";
    }

    @Override
    public ResultTransformer<Order, OrderDTO> getTransformer() {
        return new ModelMapperBasedResultTransformer<>(modelMapper, OrderDTO.class);
    }

    public OrderPaginationSearchQuery orderBy(SortSpecs sortSpecs) {
        if(isNotEmpty(sortSpecs)) {
            applySortSpecs(sortSpecs);
        }
        return this;
    }

    public OrderPaginationSearchQuery filterBy(FilterSpecs filterSpecs) {
        if(isNotEmpty(filterSpecs)) {
            applyFilterSpecs(filterSpecs);
        }
        return this;
    }

}
