package com.snapp.translation.web.rest;

import com.snapp.translation.repository.TranslationCompanyRepository;
import com.snapp.translation.service.TranslationCompanyService;
import com.snapp.translation.service.dto.TranslationCompanyDTO;
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
 * REST controller for managing {@link com.snapp.translation.domain.TranslationCompany}.
 */
@RestController
@RequestMapping("/api")
public class TranslationCompanyResource {

    private final Logger log = LoggerFactory.getLogger(TranslationCompanyResource.class);

    private static final String ENTITY_NAME = "translationCompany";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final TranslationCompanyService translationCompanyService;

    private final TranslationCompanyRepository translationCompanyRepository;

    public TranslationCompanyResource(
        TranslationCompanyService translationCompanyService,
        TranslationCompanyRepository translationCompanyRepository
    ) {
        this.translationCompanyService = translationCompanyService;
        this.translationCompanyRepository = translationCompanyRepository;
    }

    /**
     * {@code POST  /translation-companies} : Create a new translationCompany.
     *
     * @param translationCompanyDTO the translationCompanyDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new translationCompanyDTO, or with status {@code 400 (Bad Request)} if the translationCompany has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/translation-companies")
    public ResponseEntity<TranslationCompanyDTO> createTranslationCompany(@RequestBody TranslationCompanyDTO translationCompanyDTO)
        throws URISyntaxException {
        log.debug("REST request to save TranslationCompany : {}", translationCompanyDTO);
        if (translationCompanyDTO.getId() != null) {
            throw new BadRequestAlertException("A new translationCompany cannot already have an ID", ENTITY_NAME, "idexists");
        }
        TranslationCompanyDTO result = translationCompanyService.save(translationCompanyDTO);
        return ResponseEntity
            .created(new URI("/api/translation-companies/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /translation-companies/:id} : Updates an existing translationCompany.
     *
     * @param id the id of the translationCompanyDTO to save.
     * @param translationCompanyDTO the translationCompanyDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated translationCompanyDTO,
     * or with status {@code 400 (Bad Request)} if the translationCompanyDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the translationCompanyDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/translation-companies/{id}")
    public ResponseEntity<TranslationCompanyDTO> updateTranslationCompany(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody TranslationCompanyDTO translationCompanyDTO
    ) throws URISyntaxException {
        log.debug("REST request to update TranslationCompany : {}, {}", id, translationCompanyDTO);
        if (translationCompanyDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, translationCompanyDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!translationCompanyRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        TranslationCompanyDTO result = translationCompanyService.save(translationCompanyDTO);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, translationCompanyDTO.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /translation-companies/:id} : Partial updates given fields of an existing translationCompany, field will ignore if it is null
     *
     * @param id the id of the translationCompanyDTO to save.
     * @param translationCompanyDTO the translationCompanyDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated translationCompanyDTO,
     * or with status {@code 400 (Bad Request)} if the translationCompanyDTO is not valid,
     * or with status {@code 404 (Not Found)} if the translationCompanyDTO is not found,
     * or with status {@code 500 (Internal Server Error)} if the translationCompanyDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/translation-companies/{id}", consumes = "application/merge-patch+json")
    public ResponseEntity<TranslationCompanyDTO> partialUpdateTranslationCompany(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody TranslationCompanyDTO translationCompanyDTO
    ) throws URISyntaxException {
        log.debug("REST request to partial update TranslationCompany partially : {}, {}", id, translationCompanyDTO);
        if (translationCompanyDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, translationCompanyDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!translationCompanyRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<TranslationCompanyDTO> result = translationCompanyService.partialUpdate(translationCompanyDTO);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, translationCompanyDTO.getId().toString())
        );
    }

    /**
     * {@code GET  /translation-companies} : get all the translationCompanies.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of translationCompanies in body.
     */
    @GetMapping("/translation-companies")
    public ResponseEntity<List<TranslationCompanyDTO>> getAllTranslationCompanies(Pageable pageable) {
        log.debug("REST request to get a page of TranslationCompanies");
        Page<TranslationCompanyDTO> page = translationCompanyService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /translation-companies/:id} : get the "id" translationCompany.
     *
     * @param id the id of the translationCompanyDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the translationCompanyDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/translation-companies/{id}")
    public ResponseEntity<TranslationCompanyDTO> getTranslationCompany(@PathVariable Long id) {
        log.debug("REST request to get TranslationCompany : {}", id);
        Optional<TranslationCompanyDTO> translationCompanyDTO = translationCompanyService.findOne(id);
        return ResponseUtil.wrapOrNotFound(translationCompanyDTO);
    }

    /**
     * {@code DELETE  /translation-companies/:id} : delete the "id" translationCompany.
     *
     * @param id the id of the translationCompanyDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/translation-companies/{id}")
    public ResponseEntity<Void> deleteTranslationCompany(@PathVariable Long id) {
        log.debug("REST request to delete TranslationCompany : {}", id);
        translationCompanyService.delete(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
