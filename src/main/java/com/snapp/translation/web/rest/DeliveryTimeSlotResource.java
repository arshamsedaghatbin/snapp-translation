package com.snapp.translation.web.rest;

import com.snapp.translation.repository.DeliveryTimeSlotRepository;
import com.snapp.translation.service.DeliveryTimeSlotService;
import com.snapp.translation.service.dto.DeliveryTimeSlotDTO;
import com.snapp.translation.web.rest.errors.BadRequestAlertException;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.PaginationUtil;
import tech.jhipster.web.util.ResponseUtil;

/**
 * REST controller for managing {@link com.snapp.translation.domain.DeliveryTimeSlot}.
 */
@RestController
@RequestMapping("/api")
public class DeliveryTimeSlotResource {

    private final Logger log = LoggerFactory.getLogger(DeliveryTimeSlotResource.class);

    private static final String ENTITY_NAME = "deliveryTimeSlot";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final DeliveryTimeSlotService deliveryTimeSlotService;

    private final DeliveryTimeSlotRepository deliveryTimeSlotRepository;

    public DeliveryTimeSlotResource(
        DeliveryTimeSlotService deliveryTimeSlotService,
        DeliveryTimeSlotRepository deliveryTimeSlotRepository
    ) {
        this.deliveryTimeSlotService = deliveryTimeSlotService;
        this.deliveryTimeSlotRepository = deliveryTimeSlotRepository;
    }

    /**
     * {@code POST  /delivery-time-slots} : Create a new deliveryTimeSlot.
     *
     * @param deliveryTimeSlotDTO the deliveryTimeSlotDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new deliveryTimeSlotDTO, or with status {@code 400 (Bad Request)} if the deliveryTimeSlot has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/delivery-time-slots")
    public ResponseEntity<DeliveryTimeSlotDTO> createDeliveryTimeSlot(@RequestBody DeliveryTimeSlotDTO deliveryTimeSlotDTO)
        throws URISyntaxException {
        log.debug("REST request to save DeliveryTimeSlot : {}", deliveryTimeSlotDTO);
        if (deliveryTimeSlotDTO.getId() != null) {
            throw new BadRequestAlertException("A new deliveryTimeSlot cannot already have an ID", ENTITY_NAME, "idexists");
        }
        DeliveryTimeSlotDTO result = deliveryTimeSlotService.save(deliveryTimeSlotDTO);
        return ResponseEntity
            .created(new URI("/api/delivery-time-slots/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /delivery-time-slots/:id} : Updates an existing deliveryTimeSlot.
     *
     * @param id the id of the deliveryTimeSlotDTO to save.
     * @param deliveryTimeSlotDTO the deliveryTimeSlotDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated deliveryTimeSlotDTO,
     * or with status {@code 400 (Bad Request)} if the deliveryTimeSlotDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the deliveryTimeSlotDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/delivery-time-slots/{id}")
    public ResponseEntity<DeliveryTimeSlotDTO> updateDeliveryTimeSlot(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody DeliveryTimeSlotDTO deliveryTimeSlotDTO
    ) throws URISyntaxException {
        log.debug("REST request to update DeliveryTimeSlot : {}, {}", id, deliveryTimeSlotDTO);
        if (deliveryTimeSlotDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, deliveryTimeSlotDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!deliveryTimeSlotRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        DeliveryTimeSlotDTO result = deliveryTimeSlotService.save(deliveryTimeSlotDTO);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, deliveryTimeSlotDTO.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /delivery-time-slots/:id} : Partial updates given fields of an existing deliveryTimeSlot, field will ignore if it is null
     *
     * @param id the id of the deliveryTimeSlotDTO to save.
     * @param deliveryTimeSlotDTO the deliveryTimeSlotDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated deliveryTimeSlotDTO,
     * or with status {@code 400 (Bad Request)} if the deliveryTimeSlotDTO is not valid,
     * or with status {@code 404 (Not Found)} if the deliveryTimeSlotDTO is not found,
     * or with status {@code 500 (Internal Server Error)} if the deliveryTimeSlotDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/delivery-time-slots/{id}", consumes = "application/merge-patch+json")
    public ResponseEntity<DeliveryTimeSlotDTO> partialUpdateDeliveryTimeSlot(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody DeliveryTimeSlotDTO deliveryTimeSlotDTO
    ) throws URISyntaxException {
        log.debug("REST request to partial update DeliveryTimeSlot partially : {}, {}", id, deliveryTimeSlotDTO);
        if (deliveryTimeSlotDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, deliveryTimeSlotDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!deliveryTimeSlotRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<DeliveryTimeSlotDTO> result = deliveryTimeSlotService.partialUpdate(deliveryTimeSlotDTO);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, deliveryTimeSlotDTO.getId().toString())
        );
    }

    /**
     * {@code GET  /delivery-time-slots} : get all the deliveryTimeSlots.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of deliveryTimeSlots in body.
     */
    @GetMapping("/delivery-time-slots")
    public ResponseEntity<List<DeliveryTimeSlotDTO>> getAllDeliveryTimeSlots(Pageable pageable) {
        log.debug("REST request to get a page of DeliveryTimeSlots");
        Page<DeliveryTimeSlotDTO> page = deliveryTimeSlotService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /delivery-time-slots/:id} : get the "id" deliveryTimeSlot.
     *
     * @param id the id of the deliveryTimeSlotDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the deliveryTimeSlotDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/delivery-time-slots/{id}")
    public ResponseEntity<DeliveryTimeSlotDTO> getDeliveryTimeSlot(@PathVariable Long id) {
        log.debug("REST request to get DeliveryTimeSlot : {}", id);
        Optional<DeliveryTimeSlotDTO> deliveryTimeSlotDTO = deliveryTimeSlotService.findOne(id);
        return ResponseUtil.wrapOrNotFound(deliveryTimeSlotDTO);
    }

    /**
     * {@code DELETE  /delivery-time-slots/:id} : delete the "id" deliveryTimeSlot.
     *
     * @param id the id of the deliveryTimeSlotDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/delivery-time-slots/{id}")
    public ResponseEntity<Void> deleteDeliveryTimeSlot(@PathVariable Long id) {
        log.debug("REST request to delete DeliveryTimeSlot : {}", id);
        deliveryTimeSlotService.delete(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
