package org.finra.createathon.hellohive.rest;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.util.Collections;
import java.util.Map;

import javax.servlet.http.HttpServletResponse;

import org.apache.commons.io.IOUtils;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

/**
 * User: Han Li
 * Date: 8/8/16
 */
@RestController
@RequestMapping("/rest/file")
public class FileRestController
{
    @RequestMapping(value = "/queryId/{queryId}", method = RequestMethod.GET)
    public Map<String, String> fileDownload(HttpServletResponse response, @PathVariable("queryId") String queryId) throws IOException
    {
        File file = new File("/tmp/" + queryId);
        if(file.exists())
        {
            setHttpHeaders(response, file);
            OutputStream os = response.getOutputStream();
            IOUtils.copyLarge(new FileInputStream(file), os);
            return null;
        }
        else {
            return Collections.singletonMap("msg", "file not fould for id: " + queryId);
        }
    }

    private void setHttpHeaders(HttpServletResponse response, File file) {
        response.setHeader("Content-Length", Long.toString(file.length()));
        response.setHeader("Content-disposition", String.format("attachment; filename=\"%s\"", file.getName()));

        // Set cache to 1s so IE can download the file.
        // See http://support.microsoft.com/kb/316431
        response.setHeader("Pragma", "");
        response.setHeader("Cache-control", "max-age=1");
    }
}
